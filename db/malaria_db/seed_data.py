"""Datos de muestra — copiados 1:1 de lo que el frontend tiene hardcodeado.

Fuentes:
  - scr/src/data/mock.ts         → reviewRows, searchRows, regionData, identities,
                                    incidence/positivity (semanal y anual)
  - scr/src/features/dashboard/DashboardPage.tsx → regionDistricts
"""
from __future__ import annotations

# ── Departamentos (nombre en MAYÚSCULAS como en el SVG) + código DANE ────
DEPT_DANE = {
    "ANTIOQUIA": "05",
    "AMAZONAS": "91",
    "CAUCA": "19",
    "CHOCO": "27",
    "CORDOBA": "23",
    "GUAVIARE": "95",
    "NARINO": "52",
    "PUTUMAYO": "86",
    "VALLE DEL CAUCA": "76",
    "VICHADA": "99",
}

# Población aproximada por departamento (demo, para tasas de incidencia). Año 2026.
DEPT_POPULATION_2026 = {
    "ANTIOQUIA": 6_900_000,
    "AMAZONAS": 79_000,
    "CAUCA": 1_490_000,
    "CHOCO": 545_000,
    "CORDOBA": 1_820_000,
    "GUAVIARE": 86_000,
    "NARINO": 1_630_000,
    "PUTUMAYO": 360_000,
    "VALLE DEL CAUCA": 4_500_000,
    "VICHADA": 112_000,
}

# ── regionData (mock.ts): totales del panel por departamento ─────────────
# (cases, positivity_pct, localities_active, localities_total, trend_pct)
REGION_DATA = {
    "NARINO":          (1284, 12.4, 18, 24,  8.2),
    "CHOCO":           (964,  15.1, 21, 30, 11.0),
    "CAUCA":           (512,   9.7, 12, 20,  3.4),
    "VALLE DEL CAUCA": (287,   6.2,  8, 16, -1.2),
    "ANTIOQUIA":       (631,  10.8, 19, 40,  5.6),
    "CORDOBA":         (418,   8.9, 10, 18,  2.1),
    "AMAZONAS":        (356,  13.7,  7, 11,  6.9),
    "PUTUMAYO":        (402,  11.5,  9, 13,  4.8),
    "GUAVIARE":        (173,   7.4,  3,  4,  1.0),
    "VICHADA":         (142,   9.1,  3,  4, -0.6),
}

# ── regionDistricts (DashboardPage.tsx): casos por distrito ──────────────
# nombre de municipio -> casos
REGION_DISTRICTS = {
    "NARINO": [
        ("Tumaco", 71), ("Barbacoas", 62), ("Roberto Payán", 55), ("Magüí Payán", 48),
        ("Fco. Pizarro", 40), ("Olaya Herrera", 33), ("El Charco", 24),
    ],
    "CHOCO": [
        ("Quibdó", 84), ("Riosucio", 66), ("Istmina", 52), ("Alto Baudó", 45),
        ("Bojayá", 38), ("Condoto", 29), ("Tadó", 21),
    ],
    "CAUCA": [
        ("Guapi", 58), ("Timbiquí", 49), ("López de Micay", 41), ("Argelia", 34),
        ("El Tambo", 27), ("Popayán", 19), ("S. de Quilichao", 14),
    ],
    "VALLE DEL CAUCA": [
        ("Buenaventura", 77), ("Dagua", 34), ("Cali", 26), ("Jamundí", 18),
        ("El Cairo", 15), ("Bolívar", 12),
    ],
    "ANTIOQUIA": [
        ("El Bagre", 63), ("Zaragoza", 55), ("Cáceres", 47), ("Tarazá", 40),
        ("Turbo", 36), ("Nechí", 28), ("Segovia", 22),
    ],
    "CORDOBA": [
        ("Tierralta", 51), ("Pto. Libertador", 44), ("Montelíbano", 37), ("Ayapel", 30),
        ("Valencia", 23), ("Montería", 16), ("Pto. Escondido", 12),
    ],
    "AMAZONAS": [
        ("Leticia", 39), ("Puerto Nariño", 31), ("Tarapacá", 24), ("La Chorrera", 18),
        ("La Pedrera", 13), ("Pto. Santander", 9),
    ],
    "PUTUMAYO": [
        ("Puerto Asís", 57), ("Valle del Guamuez", 48), ("Orito", 40), ("San Miguel", 33),
        ("Pto. Leguízamo", 27), ("Mocoa", 20), ("Puerto Caicedo", 15),
    ],
    "GUAVIARE": [
        ("San José", 45), ("El Retorno", 33), ("Calamar", 25), ("Miraflores", 18),
    ],
    "VICHADA": [
        ("Cumaribo", 42), ("Puerto Carreño", 30), ("La Primavera", 23), ("Santa Rosalía", 15),
    ],
}

# ── Series del panel (mock.ts): nacionales ───────────────────────────────
# semanal (Sem 15..26): (label, incidencia, positividad, resaltar_ultimo)
EPI_WEEKLY = [
    ("Sem 15", 62,  8.1), ("Sem 16", 71,  8.9), ("Sem 17", 68,  9.3),
    ("Sem 18", 84, 10.2), ("Sem 19", 79, 11.1), ("Sem 20", 96, 11.8),
    ("Sem 21", 88, 12.0), ("Sem 22", 74, 10.6), ("Sem 23", 91, 12.4),
    ("Sem 24", 103, 13.1), ("Sem 25", 97, 12.7), ("Sem 26", 112, 13.9),
]
# mensual (Ene..Dic 2026): (label, incidencia, positividad)
EPI_MONTHLY = [
    ("Ene", 210,  7.4), ("Feb", 245,  8.0), ("Mar", 298,  9.1), ("Abr", 331, 10.2),
    ("May", 402, 11.3), ("Jun", 456, 12.1), ("Jul", 421, 11.6), ("Ago", 389, 10.9),
    ("Sep", 344, 10.1), ("Oct", 312,  9.4), ("Nov", 268,  8.5), ("Dic", 231,  7.8),
]

# ── Usuarios (identities de mock.ts). Contraseñas demo del login. ────────
# (username, full_name, role, email, password | None)
USERS = [
    ("supervisor",  "James Torres",      "supervisor", "maurottito@gmail.com", "123456"),
    ("especialista", "Marco Fernández",  "specialist", "maurottito@gmail.com", "654321"),
    ("gerente",     "Manuela Hernández", "manager",    "maurottito@gmail.com", None),
]

# ── ColVols (mock.ts) ────────────────────────────────────────────────────
COLVOLS = [
    ("ColVol-01", "D. Angulo"),
    ("ColVol-02", "R. Caicedo"),
    ("ColVol-03", "L. Quiñones"),
    ("ColVol-04", "M. Prado"),
]

# ── Esquemas de tratamiento ──────────────────────────────────────────────
TREATMENTS = [
    ("Cloroquina", "vivax", "Esquema para P. vivax no complicada."),
    ("Primaquina", "vivax", "Cura radical de hipnozoítos de P. vivax."),
    ("Cloroquina + Primaquina", "vivax", "Esquema combinado P. vivax."),
]

# ── Registros de diagnóstico (mock.ts) ───────────────────────────────────
# reviewRows: recién cargados (status draft; needsReview -> flagged)
REVIEW_ROWS = [
    # id, date, colvolCode, locality, motivo, nombre, ident, nacionalidad, sexo, fnac, result, searchType, medic, needsReview
    ("NAR-2231", "24/06/26", "ColVol-01", "Llorente",   "Fiebre",       "Carlos Erazo",    "CC 1.087.334", "Colombiana", "H", "12/03/1990", "P. vivax",      "Pasiva",    "Sí · Cloroquina", False),
    ("NAR-2232", "24/06/26", "ColVol-01", "Espriella",  "Fiebre",       "Ana Riascos",     "CC 1.087.556", "Colombiana", "M", "05/11/1985", "P. falciparum", "Pasiva",    "Sí · Primaquina", False),
    ("NAR-2233", "23/06/26", "ColVol-02", "Tumaco",     "Control",      "Luis Prado",      "TI 1.002.771", "Colombiana", "H", "20/07/2008", "Negativa",      "Proactiva", "No",              False),
    ("NAR-2234", "23/06/26", "ColVol-02", "San Luis",   "Fiebre",       "Marta Sinisterra","CC 1.088.019", "Colombiana", "M", "14/02/1979", "P. vivax",      "Reactiva",  "Sí · Cloroquina", False),
    ("NAR-2235", "22/06/26", "ColVol-03", "Chajal",     "Fiebre",       "Rosa Angulo",     "CE 5.114.220", "Venezolana", "M", "30/09/1994", "Inválida",      "Pasiva",    "No",              True),
    ("NAR-2236", "22/06/26", "ColVol-03", "Candelillas","Búsqueda",     "Jorge Castillo",  "CC 1.089.442", "Colombiana", "H", "08/06/1966", "P. vivax",      "Proactiva", "Sí · Cloroquina", False),
]

# searchRows: registros ya validados (status validated)
SEARCH_ROWS = [
    ("NAR-3312", "21/06/26", "ColVol-01", "Llorente",   "Fiebre",   "Pedro Quiñones",  "CC 1.090.112", "Colombiana", "H", "17/01/1982", "P. vivax",      "Pasiva",    "Sí · Cloroquina", False),
    ("NAR-3311", "21/06/26", "ColVol-02", "Tumaco",     "Control",  "Sofía Angulo",    "CC 1.090.118", "Colombiana", "M", "23/05/1998", "Negativa",      "Proactiva", "No",              False),
    ("NAR-3309", "20/06/26", "ColVol-01", "Espriella",  "Fiebre",   "Daniel Caicedo",  "CC 1.090.221", "Colombiana", "H", "11/09/1975", "P. falciparum", "Pasiva",    "Sí · Primaquina", False),
    ("NAR-3307", "20/06/26", "ColVol-03", "Imbilí",     "Búsqueda", "Laura Prado",     "TI 1.003.554", "Colombiana", "M", "02/12/2007", "P. vivax",      "Reactiva",  "Sí · Cloroquina", False),
    ("NAR-3305", "19/06/26", "ColVol-02", "San Luis",   "Fiebre",   "Andrés Riascos",  "CC 1.090.330", "Colombiana", "H", "28/04/1989", "Negativa",      "Pasiva",    "No",              False),
    ("NAR-3303", "19/06/26", "ColVol-03", "Chajal",     "Fiebre",   "Camila Sinisterra","CE 5.115.007","Venezolana", "M", "15/08/1992", "P. vivax",      "Proactiva", "Sí · Cloroquina", False),
    ("NAR-3301", "18/06/26", "ColVol-04", "Candelillas","Control",  "Miguel Erazo",    "CC 1.090.447", "Colombiana", "H", "07/10/1970", "Negativa",      "Pasiva",    "No",              False),
    ("NAR-3298", "18/06/26", "ColVol-01", "Llorente",   "Fiebre",   "Valentina Castillo","CC 1.090.550","Colombiana","M", "19/06/2001", "P. falciparum", "Reactiva",  "Sí · Primaquina", False),
]

# Localidades usadas por los registros (todas corregimientos del municipio Tumaco).
ROW_LOCALITIES = ["Llorente", "Espriella", "Tumaco", "San Luis", "Chajal", "Candelillas", "Imbilí"]
ROW_LOCALITY_MUNI = "Tumaco"   # municipio (NARIÑO) al que se asocian
ROW_LOCALITY_DEPT = "NARINO"

# ── Mapeos texto del frontend -> enums del modelo ────────────────────────
RESULT_MAP = {
    "P. falciparum": ("positive", "falciparum"),
    "P. vivax":      ("positive", "vivax"),
    "Negativa":      ("negative", "none"),
    "Inválida":      ("invalid",  "none"),
}
SEARCH_MAP = {"Pasiva": "passive", "Proactiva": "proactive", "Reactiva": "reactive"}
SEX_MAP = {"M": "F", "H": "M"}  # M=Mujer -> F femenino; H=Hombre -> M masculino
NAT_MAP = {"Colombiana": "CO", "Venezolana": "VE"}


def parse_ident(ident: str) -> tuple[str, str]:
    """'CC 1.087.334' -> ('CC', '1087334')."""
    doc_type, _, number = ident.partition(" ")
    return doc_type.strip(), number.replace(".", "").replace(" ", "").strip()


def parse_name(nombre: str) -> tuple[str, str]:
    """'Carlos Erazo' -> ('Carlos', 'Erazo')."""
    parts = nombre.strip().split(" ", 1)
    return (parts[0], parts[1] if len(parts) > 1 else "")


def parse_treatment(medic: str) -> str | None:
    """'Sí · Cloroquina' -> 'Cloroquina'; 'No' -> None."""
    if not medic.startswith("Sí"):
        return None
    _, _, name = medic.partition("·")
    return name.strip() or None
