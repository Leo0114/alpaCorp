import type { APIRoute } from "astro";
import { Resend } from "resend";
import { z } from "zod";
import { mail } from "@/constants/contacto";
import { contact } from "@/constants/site";

export const prerender = false;

// Validación de servidor: el cliente valida con el mismo contrato.
const schema = z.object({
  nombre: z.string().trim().min(3),
  correo: z.email(),
  telefono: z.string().trim().min(10),
  mensaje: z.string().trim().min(10),
});

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  const parsed = schema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return json({ error: "invalid-payload" }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contacto] Falta RESEND_API_KEY en las variables de entorno.");
    return json({ error: "missing-configuration" }, 500);
  }

  const { nombre, correo, telefono, mensaje } = parsed.data;

  const { error } = await new Resend(apiKey).emails.send({
    from: import.meta.env.CONTACT_FROM_EMAIL ?? mail.from,
    to: import.meta.env.CONTACT_TO_EMAIL ?? contact.email,
    replyTo: correo,
    subject: mail.subject(nombre),
    text: [
      `Nombre: ${nombre}`,
      `Correo: ${correo}`,
      `Teléfono: ${telefono}`,
      "",
      mensaje,
    ].join("\n"),
  });

  if (error) {
    console.error("[contacto] Resend respondió con error:", error);
    return json({ error: "send-failed" }, 502);
  }

  return json({ ok: true }, 200);
};
