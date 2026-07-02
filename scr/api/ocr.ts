import type { VercelRequest, VercelResponse } from '@vercel/node';

// Low-latency OCR proxy for the "Registro de pruebas diagnósticas" (Anexo 1) form.
// Uses Google Gemini (free tier) via its REST API. Runs server-side so the API key
// never reaches the browser.
//
// Setup: get a free key at https://aistudio.google.com/apikey (no credit card),
// then set GEMINI_API_KEY as a Vercel environment variable
// (Project Settings -> Environment Variables). Optional: GEMINI_MODEL to override
// the model (default gemini-2.5-flash).
//
// NOTE: the free tier may retain/use submitted data to improve Google's models.
// Only send sample or de-identified images here; switch to a paid, no-training
// provider before processing real patient data.

type IncomingImage = { media_type: string; data: string };

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const PROMPT = `Eres un asistente de digitalización para el programa de vigilancia de malaria (RMEI/ISM) en Colombia.

Las imágenes adjuntas son fotos del formato en papel «Registro de pruebas diagnósticas» (Anexo 1), diligenciado a mano por colaboradores voluntarios (ColVol) en campo. Cada fila del formato es un paciente al que se le aplicó una prueba de diagnóstico rápido (PDR) de malaria.

Extrae TODAS las filas legibles de TODAS las imágenes y devuélvelas como un array JSON. Cada objeto debe tener EXACTAMENTE estas claves:

- "id": código de la muestra (ej. "NAR-2231"). Si no hay código, genera uno secuencial tipo "REG-001".
- "date": fecha de toma en formato DD/MM/AA (ej. "24/06/26").
- "colvol": nombre del colaborador voluntario (ColVol).
- "colvolCode": código del ColVol (ej. "ColVol-01"). Si no aparece, usa "".
- "locality": localidad o corregimiento.
- "motivo": uno de exactamente "Sospechoso", "Conviviente" o "Seguimiento".
- "nombre": nombre completo del paciente.
- "ident": documento de identidad tal como aparece (ej. "CC 1.087.334", "TI ...", "CE ...").
- "nacionalidad": ej. "Colombiana", "Venezolana".
- "sexo": "M" (mujer) o "H" (hombre).
- "fnac": fecha de nacimiento en formato DD/MM/AAAA.
- "result": resultado de la PDR, uno de exactamente "P. vivax", "P. falciparum", "Negativa" o "Inválida".
- "searchType": tipo de búsqueda, uno de exactamente "Pasiva", "Proactiva" o "Reactiva".
- "medic": tratamiento entregado (ej. "No", "Sí · Cloroquina", "Sí · Primaquina").
- "needsReview": true SOLO si algún campo es ilegible, ambiguo o el resultado PDR no se puede determinar con confianza; de lo contrario false.

Reglas:
- Respeta los valores permitidos exactos (con tildes) para motivo, sexo, result y searchType.
- Si un campo puntual es ilegible, deja ese campo como "" y marca needsReview: true.
- No inventes datos que no estén en la foto.
- Responde ÚNICAMENTE con el array JSON, sin texto adicional.`;

function extractJson(text: string): unknown {
  // Strip markdown fences in case the model wrapped the JSON.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('[');
  const end = candidate.lastIndexOf(']');
  if (start === -1 || end === -1) throw new Error('No se encontró un array JSON en la respuesta.');
  return JSON.parse(candidate.slice(start, end + 1));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'OCR no configurado: falta GEMINI_API_KEY en el servidor.' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const images: IncomingImage[] = body?.images ?? [];
  if (!Array.isArray(images) || images.length === 0) {
    res.status(400).json({ error: 'No se recibieron imágenes.' });
    return;
  }

  const parts = [
    ...images.map((img) => ({
      inline_data: { mime_type: img.media_type, data: img.data },
    })),
    { text: PROMPT },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  try {
    const gemResp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!gemResp.ok) {
      const detail = await gemResp.text();
      res.status(502).json({ error: `Gemini respondió ${gemResp.status}: ${detail.slice(0, 300)}` });
      return;
    }

    const data = await gemResp.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      const reason = data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason || 'sin texto';
      res.status(502).json({ error: `La respuesta del modelo no contenía datos (${reason}).` });
      return;
    }

    const rows = extractJson(text);
    res.status(200).json({ rows, imageCount: images.length });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    res.status(502).json({ error: `Fallo al leer las imágenes: ${detail}` });
  }
}
