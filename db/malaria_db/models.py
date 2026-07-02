"""Modelo de datos (SQLAlchemy 2.0) — vigilancia de malaria ISM/RMEI.

Refleja Plan/DATA_MODEL.md. Añade tres tablas *_demo que guardan tal cual las
cifras agregadas que hoy el frontend tiene hardcodeadas (regionData,
regionDistricts y las series del panel), para poblar la base sin tocar la web.
En producción esas agregaciones se calcularían desde diagnostic_record.
"""
from __future__ import annotations
import uuid
from datetime import datetime, date

from sqlalchemy import (
    String, Text, Boolean, Integer, SmallInteger, Date, DateTime, ForeignKey,
    CheckConstraint, UniqueConstraint, Numeric, BigInteger, func, Uuid,
    Enum as SAEnum,
)
from sqlalchemy.dialects.postgresql import JSONB, ARRAY
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from .enums import (
    UserRole, OcrStatus, PairingStatus, SexType, TestMethod, TestResult,
    SpeciesType, SearchType, ValidationStatus,
)


class Base(DeclarativeBase):
    pass


def _uuid_pk() -> Mapped[uuid.UUID]:
    return mapped_column(Uuid, primary_key=True, default=uuid.uuid4)


def _created_at() -> Mapped[datetime]:
    return mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


# ── Geografía ────────────────────────────────────────────────────────────
class Department(Base):
    __tablename__ = "department"
    id: Mapped[uuid.UUID] = _uuid_pk()
    dane_code: Mapped[str] = mapped_column(String(2), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    # Path SVG (mismo que el frontend). Sustituye a geom mientras no se use PostGIS.
    svg_path: Mapped[str | None] = mapped_column(Text)

    municipalities: Mapped[list["Municipality"]] = relationship(back_populates="department")


class Municipality(Base):
    __tablename__ = "municipality"
    id: Mapped[uuid.UUID] = _uuid_pk()
    department_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("department.id"), nullable=False)
    dane_code: Mapped[str] = mapped_column(String(5), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)

    department: Mapped[Department] = relationship(back_populates="municipalities")
    localities: Mapped[list["Locality"]] = relationship(back_populates="municipality")


class Locality(Base):
    __tablename__ = "locality"
    id: Mapped[uuid.UUID] = _uuid_pk()
    municipality_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("municipality.id"), nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    kind: Mapped[str | None] = mapped_column(Text)
    lat: Mapped[float | None] = mapped_column(Numeric(9, 6))
    lon: Mapped[float | None] = mapped_column(Numeric(9, 6))
    __table_args__ = (
        UniqueConstraint("municipality_id", "name", name="uq_locality_muni_name"),
        CheckConstraint("kind IN ('vereda','corregimiento','barrio','otro')", name="chk_locality_kind"),
    )

    municipality: Mapped[Municipality] = relationship(back_populates="localities")


# ── Personas y acceso ────────────────────────────────────────────────────
class AppUser(Base):
    __tablename__ = "app_user"
    id: Mapped[uuid.UUID] = _uuid_pk()
    username: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    # No único: en los datos demo las 3 identidades comparten el mismo correo.
    email: Mapped[str | None] = mapped_column(Text)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    full_name: Mapped[str] = mapped_column(Text, nullable=False)
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole, name="user_role"), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default="true")
    created_at: Mapped[datetime] = _created_at()
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class UserDepartment(Base):
    __tablename__ = "user_department"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("app_user.id", ondelete="CASCADE"), primary_key=True)
    department_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("department.id"), primary_key=True)


class ApiKey(Base):
    __tablename__ = "api_key"
    id: Mapped[uuid.UUID] = _uuid_pk()
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("app_user.id", ondelete="CASCADE"), nullable=False)
    key_hash: Mapped[str] = mapped_column(Text, nullable=False)
    label: Mapped[str | None] = mapped_column(Text)
    scopes: Mapped[list[str]] = mapped_column(ARRAY(Text), server_default="{read}")
    last_used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = _created_at()


class Colvol(Base):
    __tablename__ = "colvol"
    id: Mapped[uuid.UUID] = _uuid_pk()
    code: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(Text, nullable=False)
    locality_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("locality.id"))
    phone: Mapped[str | None] = mapped_column(Text)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default="true")
    created_at: Mapped[datetime] = _created_at()


# ── Captura: OCR y sesiones QR ───────────────────────────────────────────
class FormUpload(Base):
    __tablename__ = "form_upload"
    id: Mapped[uuid.UUID] = _uuid_pk()
    uploaded_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("app_user.id"))
    source: Mapped[str] = mapped_column(Text, nullable=False)
    storage_path: Mapped[str | None] = mapped_column(Text)
    ocr_status: Mapped[OcrStatus] = mapped_column(SAEnum(OcrStatus, name="ocr_status"), nullable=False, server_default="pending")
    ocr_provider: Mapped[str | None] = mapped_column(Text)
    ocr_raw: Mapped[dict | None] = mapped_column(JSONB)
    created_at: Mapped[datetime] = _created_at()
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    __table_args__ = (CheckConstraint("source IN ('web','mobile_qr')", name="chk_form_upload_source"),)


class PairingSession(Base):
    __tablename__ = "pairing_session"
    id: Mapped[uuid.UUID] = _uuid_pk()
    session_token: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    created_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("app_user.id"))
    status: Mapped[PairingStatus] = mapped_column(SAEnum(PairingStatus, name="pairing_status"), nullable=False, server_default="open")
    created_at: Mapped[datetime] = _created_at()
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    photos: Mapped[list["MobilePhoto"]] = relationship(back_populates="session")


class MobilePhoto(Base):
    __tablename__ = "mobile_photo"
    id: Mapped[uuid.UUID] = _uuid_pk()
    session_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("pairing_session.id", ondelete="CASCADE"), nullable=False)
    storage_path: Mapped[str] = mapped_column(Text, nullable=False)
    content_type: Mapped[str | None] = mapped_column(Text)
    size_bytes: Mapped[int | None] = mapped_column(Integer)
    uploaded_at: Mapped[datetime] = _created_at()
    imported_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    session: Mapped[PairingSession] = relationship(back_populates="photos")


# ── Núcleo: paciente y registro de diagnóstico ───────────────────────────
class Patient(Base):
    __tablename__ = "patient"
    id: Mapped[uuid.UUID] = _uuid_pk()
    document_type: Mapped[str | None] = mapped_column(Text)
    document_no: Mapped[str | None] = mapped_column(Text)
    first_name: Mapped[str | None] = mapped_column(Text)
    last_name: Mapped[str | None] = mapped_column(Text)
    birth_date: Mapped[date | None] = mapped_column(Date)
    sex: Mapped[SexType | None] = mapped_column(SAEnum(SexType, name="sex_type"))
    nationality: Mapped[str | None] = mapped_column(String(2))
    created_at: Mapped[datetime] = _created_at()
    __table_args__ = (
        UniqueConstraint("document_type", "document_no", name="uq_patient_document"),
        CheckConstraint("document_type IN ('CC','TI','RC','CE','PA','MS','AS','NUIP')", name="chk_patient_doctype"),
    )


class TreatmentScheme(Base):
    __tablename__ = "treatment_scheme"
    id: Mapped[uuid.UUID] = _uuid_pk()
    name: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    target: Mapped[SpeciesType | None] = mapped_column(SAEnum(SpeciesType, name="species_type"))
    description: Mapped[str | None] = mapped_column(Text)


class DiagnosticRecord(Base):
    __tablename__ = "diagnostic_record"
    id: Mapped[uuid.UUID] = _uuid_pk()
    external_code: Mapped[str | None] = mapped_column(Text, unique=True)  # p.ej. 'NAR-2231'

    patient_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("patient.id"))
    colvol_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("colvol.id"))
    locality_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("locality.id"))
    form_upload_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("form_upload.id"))

    test_date: Mapped[date] = mapped_column(Date, nullable=False)
    epi_week: Mapped[int | None] = mapped_column(SmallInteger)
    epi_year: Mapped[int | None] = mapped_column(SmallInteger)
    consultation_reason: Mapped[str | None] = mapped_column(Text)
    search_kind: Mapped[SearchType] = mapped_column(SAEnum(SearchType, name="search_type"), nullable=False)
    method: Mapped[TestMethod] = mapped_column(SAEnum(TestMethod, name="test_method"), nullable=False, server_default="pdr")
    result: Mapped[TestResult] = mapped_column(SAEnum(TestResult, name="test_result"), nullable=False)
    species: Mapped[SpeciesType] = mapped_column(SAEnum(SpeciesType, name="species_type"), nullable=False, server_default="none")
    treatment_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("treatment_scheme.id"))
    notes: Mapped[str | None] = mapped_column(Text)

    status: Mapped[ValidationStatus] = mapped_column(SAEnum(ValidationStatus, name="validation_status"), nullable=False, server_default="draft")
    created_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("app_user.id"))
    validated_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("app_user.id"))
    validated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    created_at: Mapped[datetime] = _created_at()
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    __table_args__ = (
        CheckConstraint("result <> 'positive' OR species <> 'none'", name="chk_species_when_positive"),
    )


class AuditLog(Base):
    __tablename__ = "audit_log"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    table_name: Mapped[str] = mapped_column(Text, nullable=False)
    record_id: Mapped[uuid.UUID] = mapped_column(Uuid, nullable=False)
    action: Mapped[str] = mapped_column(Text, nullable=False)
    changed_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("app_user.id"))
    diff: Mapped[dict | None] = mapped_column(JSONB)
    created_at: Mapped[datetime] = _created_at()
    __table_args__ = (CheckConstraint("action IN ('insert','update','delete','validate')", name="chk_audit_action"),)


# ── Analítica ────────────────────────────────────────────────────────────
class DepartmentPopulation(Base):
    __tablename__ = "department_population"
    department_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("department.id"), primary_key=True)
    year: Mapped[int] = mapped_column(SmallInteger, primary_key=True)
    population: Mapped[int] = mapped_column(Integer, nullable=False)


# ── Snapshots demo (cifras que hoy el frontend tiene hardcodeadas) ───────
class RegionStatDemo(Base):
    """regionData del frontend: totales por departamento del panel."""
    __tablename__ = "region_stat_demo"
    department_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("department.id"), primary_key=True)
    cases: Mapped[int] = mapped_column(Integer, nullable=False)
    positivity_pct: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    localities_active: Mapped[int] = mapped_column(Integer)
    localities_total: Mapped[int] = mapped_column(Integer)
    trend_pct: Mapped[float] = mapped_column(Numeric(5, 2))


class DistrictStatDemo(Base):
    """regionDistricts del frontend: casos por distrito (coropleta por región)."""
    __tablename__ = "district_stat_demo"
    id: Mapped[uuid.UUID] = _uuid_pk()
    municipality_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("municipality.id"), nullable=False, unique=True)
    cases: Mapped[int] = mapped_column(Integer, nullable=False)


class EpiSeriesDemo(Base):
    """Series del panel (incidencia y positividad), nacional, por semana o mes."""
    __tablename__ = "epi_series_demo"
    id: Mapped[uuid.UUID] = _uuid_pk()
    scope: Mapped[str] = mapped_column(Text, nullable=False, server_default="national")
    period_kind: Mapped[str] = mapped_column(Text, nullable=False)  # 'week' | 'month'
    idx: Mapped[int] = mapped_column(Integer, nullable=False)
    label: Mapped[str] = mapped_column(Text, nullable=False)
    incidence: Mapped[float | None] = mapped_column(Numeric(6, 2))
    positivity_pct: Mapped[float | None] = mapped_column(Numeric(6, 2))
    is_highlight: Mapped[bool] = mapped_column(Boolean, server_default="false")
    __table_args__ = (
        UniqueConstraint("scope", "period_kind", "idx", name="uq_epi_series_demo"),
        CheckConstraint("period_kind IN ('week','month')", name="chk_epi_period_kind"),
    )
