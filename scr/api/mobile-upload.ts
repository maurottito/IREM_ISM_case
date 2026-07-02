import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

// Receives one photo taken on the phone and stores it in Vercel Blob under the
// pairing session prefix. The desktop later lists that prefix to pull the photos
// into the OCR flow. Requires the BLOB_READ_WRITE_TOKEN env var (created
// automatically when a Blob store is connected to the Vercel project).

type Body = { session?: string; name?: string; contentType?: string; dataBase64?: string };

// Only allow simple session ids so nobody can traverse the blob namespace.
const isValidSession = (s: string) => /^[a-zA-Z0-9_-]{6,64}$/.test(s);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    res.status(503).json({ error: 'Almacenamiento no configurado: falta BLOB_READ_WRITE_TOKEN (conecta un Blob store en Vercel).' });
    return;
  }

  const body: Body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const session = body?.session?.trim() ?? '';
  const dataBase64 = body?.dataBase64;
  const contentType = body?.contentType || 'image/jpeg';

  if (!isValidSession(session)) {
    res.status(400).json({ error: 'Sesión inválida.' });
    return;
  }
  if (!dataBase64) {
    res.status(400).json({ error: 'No se recibió la imagen.' });
    return;
  }

  try {
    const buffer = Buffer.from(dataBase64, 'base64');
    const safeName = (body?.name || 'foto.jpg').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-40);
    const blob = await put(`mobile/${session}/${Date.now()}-${safeName}`, buffer, {
      access: 'private', // patient photos: readable only with the store token, never via public URL
      token,
      contentType,
      addRandomSuffix: true,
    });
    res.status(200).json({ ok: true, pathname: blob.pathname });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    res.status(502).json({ error: `No se pudo guardar la foto: ${detail}` });
  }
}
