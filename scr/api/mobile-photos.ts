import type { VercelRequest, VercelResponse } from '@vercel/node';
import { list, del } from '@vercel/blob';

// GET  /api/mobile-photos?session=<id>  -> lists the photos uploaded from the
//   phone for a pairing session so the desktop can pull them into the OCR flow.
// DELETE /api/mobile-photos?session=<id> -> removes them once imported, so no
//   patient images linger in Blob storage.

const isValidSession = (s: string) => /^[a-zA-Z0-9_-]{6,64}$/.test(s);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!process.env.BLOB_STORE_ID && !process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(503).json({ error: 'Almacenamiento no configurado: conecta un Blob store al proyecto en Vercel.' });
    return;
  }

  const raw = req.query.session;
  const session = (Array.isArray(raw) ? raw[0] : raw ?? '').trim();
  if (!isValidSession(session)) {
    res.status(400).json({ error: 'Sesión inválida.' });
    return;
  }

  const prefix = `mobile/${session}/`;

  try {
    if (req.method === 'GET') {
      // Only metadata — the blobs are private, so we never hand out URLs. The
      // desktop calls /api/mobile-fetch to pull the bytes through the token.
      const { blobs } = await list({ prefix });
      const photos = blobs
        .sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
        .map((b) => ({ pathname: b.pathname, uploadedAt: b.uploadedAt, size: b.size }));
      res.status(200).json({ ok: true, photos });
      return;
    }

    if (req.method === 'DELETE') {
      const { blobs } = await list({ prefix });
      if (blobs.length > 0) await del(blobs.map((b) => b.url));
      res.status(200).json({ ok: true, deleted: blobs.length });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    res.status(502).json({ error: `Error de almacenamiento: ${detail}` });
  }
}
