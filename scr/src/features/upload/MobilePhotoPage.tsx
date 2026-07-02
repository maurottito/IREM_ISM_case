import { useState, useRef } from 'react';

// Standalone page opened on the phone after scanning the QR (URL: /?cam=<session>).
// It lets the user take photos of the paper form and uploads each one to the
// pairing session; the desktop is polling that session and pulls them in.

const MAX_DIMENSION = 1600;

function downscaleToBase64(file: File): Promise<{ dataBase64: string; contentType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('No se pudo procesar la imagen.')); return; }
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve({ dataBase64: dataUrl.split(',')[1], contentType: 'image/jpeg' });
      };
      img.onerror = () => reject(new Error('No se pudo cargar la imagen.'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

export function MobilePhotoPage({ sessionId }: { sessionId: string }) {
  const [sent, setSent] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const valid = /^[a-zA-Z0-9_-]{6,64}$/.test(sessionId);

  const handleFiles = async (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    let ok = 0;
    for (const file of files) {
      try {
        const { dataBase64, contentType } = await downscaleToBase64(file);
        const res = await fetch('/api/mobile-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session: sessionId, name: file.name, contentType, dataBase64 }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `Error ${res.status}`);
        }
        ok += 1;
        setSent((n) => n + 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    }
    setBusy(false);
    if (ok === 0) return;
  };

  if (!valid) {
    return (
      <div className="mobile-page">
        <div className="mobile-card">
          <p className="upload-title">Enlace no válido</p>
          <p className="upload-sub">Vuelve a la computadora y genera un nuevo código QR desde «Cargar registros».</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-page">
      <div className="mobile-card">
        <div className="upload-icon-wrap" style={{ margin: '0 auto 14px' }}><CameraIcon /></div>
        <p className="upload-title">Toma las fotos del formato</p>
        <p className="upload-sub" style={{ marginBottom: 18 }}>
          Fotografía el «Registro de pruebas diagnósticas». Puedes tomar varias fotos. Al terminar, vuelve a la computadora.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
        />
        <button type="button" className="btn btn-primary btn-block" onClick={() => inputRef.current?.click()} disabled={busy}>
          <CameraIcon /> {busy ? 'Enviando…' : sent > 0 ? 'Tomar otra foto' : 'Tomar foto'}
        </button>

        {sent > 0 && (
          <div className="mobile-sent">
            <CheckIcon /> {sent} {sent === 1 ? 'foto enviada' : 'fotos enviadas'} a la computadora
          </div>
        )}
        {error && <div className="alert alert-warning" style={{ marginTop: 14, textAlign: 'left' }}><span>{error}</span></div>}
        {sent > 0 && !busy && (
          <p className="upload-hint" style={{ marginTop: 16 }}>
            Ya puedes volver a la computadora para revisar y validar los registros.
          </p>
        )}
      </div>
    </div>
  );
}
