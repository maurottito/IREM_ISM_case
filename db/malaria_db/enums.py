"""Tipos enumerados del dominio (se materializan como ENUM nativos de PostgreSQL)."""
from __future__ import annotations
import enum


class UserRole(str, enum.Enum):
    supervisor = "supervisor"
    specialist = "specialist"
    manager = "manager"


class OcrStatus(str, enum.Enum):
    pending = "pending"
    processing = "processing"
    done = "done"
    failed = "failed"
    manual = "manual"


class PairingStatus(str, enum.Enum):
    open = "open"
    imported = "imported"
    expired = "expired"
    cancelled = "cancelled"


class SexType(str, enum.Enum):
    F = "F"  # femenino
    M = "M"  # masculino
    I = "I"  # indeterminado / otro


class TestMethod(str, enum.Enum):
    pdr = "pdr"
    gota_gruesa = "gota_gruesa"
    pcr = "pcr"


class TestResult(str, enum.Enum):
    positive = "positive"
    negative = "negative"
    invalid = "invalid"
    pending = "pending"


class SpeciesType(str, enum.Enum):
    vivax = "vivax"
    falciparum = "falciparum"
    malariae = "malariae"
    ovale = "ovale"
    mixed = "mixed"
    none = "none"


class SearchType(str, enum.Enum):
    passive = "passive"     # búsqueda pasiva
    proactive = "proactive"  # búsqueda activa proactiva
    reactive = "reactive"    # búsqueda activa reactiva


class ValidationStatus(str, enum.Enum):
    draft = "draft"
    validated = "validated"
    flagged = "flagged"
    rejected = "rejected"
