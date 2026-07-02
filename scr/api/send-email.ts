import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Sends the exported registry as an email attachment via Gmail SMTP.
// The credentials stay server-side (never shipped to the browser).
//
// Setup (Vercel → Project Settings → Environment Variables):
//   GMAIL_USER          your full Gmail address, e.g. maurottito@gmail.com
//   GMAIL_APP_PASSWORD  a 16-char Google "App password" (not your normal password).
//                       Create it at https://myaccount.google.com/apppasswords
//                       (requires 2-Step Verification enabled on the account).
//   MAIL_FROM_NAME      optional display name (default "Vigilancia de malaria · RMEI").

type Body = { to?: string; filename?: string; csvBase64?: string; count?: number };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    res.status(503).json({ error: 'Envío de correo no configurado: faltan GMAIL_USER / GMAIL_APP_PASSWORD en el servidor.' });
    return;
  }

  const body: Body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const to = body?.to?.trim();
  const filename = body?.filename || 'registros_malaria.csv';
  const csvBase64 = body?.csvBase64;
  const count = body?.count ?? 0;

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    res.status(400).json({ error: 'Correo de destino inválido.' });
    return;
  }
  if (!csvBase64) {
    res.status(400).json({ error: 'No se recibió el archivo a enviar.' });
    return;
  }

  const fromName = process.env.MAIL_FROM_NAME || 'Vigilancia de malaria · RMEI';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      subject: `Registros de vigilancia de malaria (${count} ${count === 1 ? 'registro' : 'registros'})`,
      text:
        `Hola,\n\n` +
        `Adjunto encontrarás el archivo «${filename}» con ${count} ${count === 1 ? 'registro' : 'registros'} ` +
        `exportados desde la plataforma de vigilancia de malaria (RMEI/ISM).\n\n` +
        `El archivo es compatible con Excel.\n\n` +
        `Saludos,\nPlataforma de vigilancia de malaria · RMEI`,
      attachments: [
        {
          filename,
          content: Buffer.from(csvBase64, 'base64'),
          contentType: 'text/csv; charset=utf-8',
        },
      ],
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    res.status(502).json({ error: `No se pudo enviar el correo: ${detail}` });
  }
}
