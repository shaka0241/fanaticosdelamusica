import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { contactSchema } from '../../domain/FormSchema';

// Usa una API Key falsa o lee de variables de entorno
const resend = new Resend(import.meta.env.RESEND_API_KEY || 're_123456789');

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawData = await request.json();

    // 1. Protección Anti-Spam (Honeypot)
    if (rawData._gotcha) {
      // Si el campo invisible tiene datos, es un bot. Retornamos 200 para engañarlo sin enviar el correo.
      return new Response(JSON.stringify({ success: true, message: 'Message sent' }), { status: 200 });
    }

    // 2. Validación de backend estricta usando Zod
    const validation = contactSchema.safeParse(rawData);
    if (!validation.success) {
      return new Response(JSON.stringify({ error: 'Faltan datos o tienen un formato incorrecto', details: validation.error.format() }), { status: 400 });
    }

    const data = validation.data;

    const { data: response, error } = await resend.emails.send({
      from: 'Fanaticos de la musica <onboarding@resend.dev>', // Email remitente (deberías configurar un dominio y usarlo)
      to: [import.meta.env.EMAIL_TO], // Colocar el correo real donde recibirás los mensajes
      subject: `Nuevo anunciante: ${data.company || data.name}`,
      html: `
        <h2>Tienes un nuevo posible anunciante</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Empresa:</strong> ${data.company}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <br/>
        <h3>Mensaje:</h3>
        <p>${data.message}</p>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
