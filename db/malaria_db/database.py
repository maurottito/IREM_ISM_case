"""Motor y sesión de SQLAlchemy a partir de DATABASE_URL."""
from __future__ import annotations
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker

load_dotenv()


def normalize_url(url: str) -> str:
    """Acepta los esquemas que entregan Neon/Vercel/Supabase y fuerza psycopg 3."""
    if url.startswith("postgres://"):
        return "postgresql+psycopg://" + url[len("postgres://"):]
    if url.startswith("postgresql://") and "+psycopg" not in url:
        return "postgresql+psycopg://" + url[len("postgresql://"):]
    return url


def get_database_url() -> str:
    url = os.getenv("DATABASE_URL")
    if not url:
        raise RuntimeError(
            "Falta DATABASE_URL. Copia db/.env.example a db/.env y coloca la "
            "cadena de conexión de tu Postgres (Neon/Vercel/Supabase/local)."
        )
    return normalize_url(url)


def get_engine() -> Engine:
    return create_engine(get_database_url(), pool_pre_ping=True, future=True)


# Sesión sin engine ligado: se asocia al crear (SessionLocal.configure(bind=engine)).
SessionLocal = sessionmaker(autoflush=False, expire_on_commit=False, future=True)
