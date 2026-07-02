"""Puebla la base con los datos de muestra del frontend (idempotente)."""
from __future__ import annotations
import os
import re
import unicodedata
from datetime import datetime, date

from passlib.hash import argon2
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import models as m
from . import seed_data as sd

# Ruta al SVG de departamentos del frontend (para llenar department.svg_path).
_SVG_TS = os.path.join(
    os.path.dirname(__file__), "..", "..",
    "scr", "src", "data", "colombia-departments.ts",
)


def _load_department_paths() -> dict[str, str]:
    """Extrae {NOMBRE: path_svg} de colombia-departments.ts (si existe)."""
    if not os.path.exists(_SVG_TS):
        return {}
    text = open(_SVG_TS, encoding="utf-8").read()
    # objetos { name: 'X', d: '...' } — tolera comillas simples/dobles.
    paths: dict[str, str] = {}
    # tolera claves con o sin comillas: name:'X',d:'...' | "name":"X","d":"..."
    pattern = re.compile(
        r"""['"]?name['"]?\s*:\s*['"]([^'"]+)['"]\s*,\s*['"]?d['"]?\s*:\s*['"]([^'"]+)['"]""",
        re.DOTALL,
    )
    for name, d in pattern.findall(text):
        paths[_norm_region(name)] = d
    return paths


def _norm_region(s: str) -> str:
    """Igual que normRegion() del frontend: sin acentos, MAYÚSCULAS."""
    stripped = "".join(
        c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn"
    )
    return stripped.upper().strip()


def _get_or_create(session: Session, model, defaults: dict | None = None, **keys):
    obj = session.scalar(select(model).filter_by(**keys))
    if obj:
        return obj, False
    params = dict(keys)
    if defaults:
        params.update(defaults)
    obj = model(**params)
    session.add(obj)
    session.flush()
    return obj, True


def _parse_date(s: str, fmt: str) -> date:
    return datetime.strptime(s, fmt).date()


def seed(session: Session) -> dict[str, int]:
    counts: dict[str, int] = {}

    def bump(k: str):
        counts[k] = counts.get(k, 0) + 1

    svg_paths = _load_department_paths()

    # 1) Departamentos + población + snapshot regionData
    depts: dict[str, m.Department] = {}
    for name, dane in sd.DEPT_DANE.items():
        dep, created = _get_or_create(
            session, m.Department, dane_code=dane,
            defaults={"name": name, "svg_path": svg_paths.get(name)},
        )
        # completa svg_path si antes venía vacío
        if dep.svg_path is None and svg_paths.get(name):
            dep.svg_path = svg_paths[name]
        depts[name] = dep
        if created:
            bump("department")

        pop = sd.DEPT_POPULATION_2026.get(name)
        if pop is not None:
            _, c = _get_or_create(
                session, m.DepartmentPopulation,
                department_id=dep.id, year=2026, defaults={"population": pop},
            )
            if c:
                bump("department_population")

        if name in sd.REGION_DATA:
            cases, pos, la, lt, trend = sd.REGION_DATA[name]
            _, c = _get_or_create(
                session, m.RegionStatDemo, department_id=dep.id,
                defaults={
                    "cases": cases, "positivity_pct": pos,
                    "localities_active": la, "localities_total": lt,
                    "trend_pct": trend,
                },
            )
            if c:
                bump("region_stat_demo")

    # 2) Municipios (regionDistricts) + snapshot de casos por distrito
    munis: dict[tuple[str, str], m.Municipality] = {}
    for dept_name, districts in sd.REGION_DISTRICTS.items():
        dep = depts[dept_name]
        for i, (muni_name, cases) in enumerate(districts, start=1):
            dane = f"{sd.DEPT_DANE[dept_name]}{i:03d}"  # DANE sintético (demo)
            muni, created = _get_or_create(
                session, m.Municipality, dane_code=dane,
                defaults={"department_id": dep.id, "name": muni_name},
            )
            munis[(dept_name, muni_name)] = muni
            if created:
                bump("municipality")
            _, c = _get_or_create(
                session, m.DistrictStatDemo, municipality_id=muni.id,
                defaults={"cases": cases},
            )
            if c:
                bump("district_stat_demo")

    # 3) Localidades de los registros (bajo municipio Tumaco de Nariño)
    tumaco = munis[(sd.ROW_LOCALITY_DEPT, sd.ROW_LOCALITY_MUNI)]
    locs: dict[str, m.Locality] = {}
    for loc_name in sd.ROW_LOCALITIES:
        loc, created = _get_or_create(
            session, m.Locality, municipality_id=tumaco.id, name=loc_name,
            defaults={"kind": "corregimiento"},
        )
        locs[loc_name] = loc
        if created:
            bump("locality")

    # 4) Usuarios (identities) con contraseñas demo hasheadas
    users: dict[str, m.AppUser] = {}
    for username, full_name, role, email, password in sd.USERS:
        pwd = password or os.urandom(9).hex()  # sin login: hash aleatorio
        user, created = _get_or_create(
            session, m.AppUser, username=username,
            defaults={
                "full_name": full_name, "role": role, "email": email,
                "password_hash": argon2.hash(pwd),
            },
        )
        users[role] = user
        if created:
            bump("app_user")
    # supervisor -> Nariño
    sup = users.get("supervisor")
    if sup:
        _, c = _get_or_create(
            session, m.UserDepartment,
            user_id=sup.id, department_id=depts["NARINO"].id,
        )
        if c:
            bump("user_department")

    # 5) ColVols (asignados a la primera localidad)
    first_loc = locs[sd.ROW_LOCALITIES[0]]
    colvols: dict[str, m.Colvol] = {}
    for code, cv_name in sd.COLVOLS:
        cv, created = _get_or_create(
            session, m.Colvol, code=code,
            defaults={"full_name": cv_name, "locality_id": first_loc.id},
        )
        colvols[code] = cv
        if created:
            bump("colvol")

    # 6) Esquemas de tratamiento
    treatments: dict[str, m.TreatmentScheme] = {}
    for name, target, desc in sd.TREATMENTS:
        tr, created = _get_or_create(
            session, m.TreatmentScheme, name=name,
            defaults={"target": target, "description": desc},
        )
        treatments[name] = tr
        if created:
            bump("treatment_scheme")

    # 7) Registros de diagnóstico (paciente + diagnostic_record)
    def add_record(row, status: str, validated_by: m.AppUser | None):
        (rid, d, cv_code, loc_name, motivo, nombre, ident, nac, sexo, fnac,
         result_txt, search_txt, medic, needs_review) = row

        doc_type, doc_no = sd.parse_ident(ident)
        first, last = sd.parse_name(nombre)
        patient, p_created = _get_or_create(
            session, m.Patient, document_type=doc_type, document_no=doc_no,
            defaults={
                "first_name": first, "last_name": last,
                "birth_date": _parse_date(fnac, "%d/%m/%Y"),
                "sex": sd.SEX_MAP.get(sexo),
                "nationality": sd.NAT_MAP.get(nac),
            },
        )
        if p_created:
            bump("patient")

        result, species = sd.RESULT_MAP[result_txt]
        test_date = _parse_date(d, "%d/%m/%y")
        iso = test_date.isocalendar()
        tr_name = sd.parse_treatment(medic)
        rec_status = "flagged" if needs_review else status

        rec, r_created = _get_or_create(
            session, m.DiagnosticRecord, external_code=rid,
            defaults={
                "patient_id": patient.id,
                "colvol_id": colvols[cv_code].id,
                "locality_id": locs[loc_name].id,
                "test_date": test_date,
                "epi_week": iso.week,
                "epi_year": iso.year,
                "consultation_reason": motivo,
                "search_kind": sd.SEARCH_MAP[search_txt],
                "method": "pdr",
                "result": result,
                "species": species,
                "treatment_id": treatments[tr_name].id if tr_name else None,
                "status": rec_status,
                "created_by": users["supervisor"].id,
                "validated_by": validated_by.id if validated_by and rec_status == "validated" else None,
                "validated_at": datetime.utcnow() if validated_by and rec_status == "validated" else None,
            },
        )
        if r_created:
            bump("diagnostic_record")

    for row in sd.REVIEW_ROWS:
        add_record(row, status="draft", validated_by=None)
    for row in sd.SEARCH_ROWS:
        add_record(row, status="validated", validated_by=users["supervisor"])

    # 8) Series del panel (nacional)
    for i, (label, inc, pos) in enumerate(sd.EPI_WEEKLY, start=1):
        _, c = _get_or_create(
            session, m.EpiSeriesDemo, scope="national", period_kind="week", idx=i,
            defaults={
                "label": label, "incidence": inc, "positivity_pct": pos,
                "is_highlight": (i == len(sd.EPI_WEEKLY)),
            },
        )
        if c:
            bump("epi_series_demo")
    for i, (label, inc, pos) in enumerate(sd.EPI_MONTHLY, start=1):
        _, c = _get_or_create(
            session, m.EpiSeriesDemo, scope="national", period_kind="month", idx=i,
            defaults={"label": label, "incidence": inc, "positivity_pct": pos},
        )
        if c:
            bump("epi_series_demo")

    session.commit()
    return counts
