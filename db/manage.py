#!/usr/bin/env python3
"""CLI de administración de la base de datos de malaria.

Uso:
    python manage.py check-ddl     # compila el DDL para Postgres SIN conectar (offline)
    python manage.py init-db       # crea el esquema (metadata.create_all) — necesita DATABASE_URL
    python manage.py seed          # puebla con los datos de muestra del frontend
    python manage.py reset         # drop + create + seed (¡borra todo!)
    python manage.py drop-all      # elimina todas las tablas (¡borra todo!)
"""
from __future__ import annotations
import sys

from malaria_db.models import Base


def _print_ddl() -> None:
    """Compila el CREATE de cada tabla al dialecto PostgreSQL, sin base de datos."""
    from sqlalchemy.schema import CreateTable
    from sqlalchemy.dialects import postgresql

    dialect = postgresql.dialect()
    tables = list(Base.metadata.sorted_tables)
    for t in tables:
        ddl = str(CreateTable(t).compile(dialect=dialect)).strip()
        print(ddl + ";\n")
    print(f"-- OK: {len(tables)} tablas compiladas para PostgreSQL.", file=sys.stderr)


def _engine():
    from malaria_db.database import get_engine
    return get_engine()


def _init_db() -> None:
    eng = _engine()
    Base.metadata.create_all(eng)
    print(f"Esquema creado en {eng.url.render_as_string(hide_password=True)}")


def _drop_all() -> None:
    eng = _engine()
    Base.metadata.drop_all(eng)
    print("Todas las tablas fueron eliminadas.")


def _seed() -> None:
    from malaria_db.database import SessionLocal
    from malaria_db.seed import seed

    eng = _engine()
    SessionLocal.configure(bind=eng)
    with SessionLocal() as session:
        counts = seed(session)
    print("Datos de muestra insertados:")
    for k in sorted(counts):
        print(f"  {k:24s} {counts[k]}")
    if not counts:
        print("  (nada nuevo — ya estaba poblada)")


def _reset() -> None:
    _drop_all()
    _init_db()
    _seed()


COMMANDS = {
    "check-ddl": _print_ddl,
    "init-db": _init_db,
    "seed": _seed,
    "reset": _reset,
    "drop-all": _drop_all,
}


def main() -> int:
    if len(sys.argv) != 2 or sys.argv[1] not in COMMANDS:
        print(__doc__)
        return 1
    COMMANDS[sys.argv[1]]()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
