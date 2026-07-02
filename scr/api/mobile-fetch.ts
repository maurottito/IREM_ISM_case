import type { VercelRequest, VercelResponse } from '@vercel/node';
import { list, get } from '@vercel/blob';

// GET /api/mobile-fetch?session=<id>
// Downloads every private photo of a pairing session through the store token and
// returns them as base64 so the desktop can feed them into the OCR flow without
// ever exposing a public URL. Photos were already downscaled on the phone.

const isValidSession = (s: string) => /^[a-zA-Z0-9_-]{6,64}$/.test(s);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    res.status(503).json({ error: 'Almacenamiento no configurado: falta BLOB_READ_WRITE_TOKEN (conecta un Blob store en Vercel).' });
    return;
  }

  const raw = req.query.session;
  const session = (Array.isArray(raw) ? raw[0] : raw ?? '').trim();
  if (!isValidSession(session)) {
    res.status(400).json({ error: 'Sesión inválida.' });
    return;
  }

  try {
    const { blobs } = await list({ prefix: `mobile/${session}/`, token });
    const ordered = blobs.sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime());

    const photos: { dataBase64: string; contentType: string }[] = [];
    for (const b of ordered) {
      const result = await get(b.pathname, { access: 'private', token });
      if (!result || !result.stream) continue;
      const arrayBuffer = await new Response(result.stream).arrayBuffer();
      photos.push({
        dataBase64: Buffer.from(arrayBuffer).toString('base64'),
        contentType: result.blob.contentType || 'image/jpeg',
      });
    }

    res.status(200).json({ ok: true, photos });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    res.status(502).json({ error: `No se pudieron leer las fotos: ${detail}` });
  }
}
