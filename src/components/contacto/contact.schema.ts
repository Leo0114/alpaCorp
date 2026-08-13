import { z } from "zod";

/**
 * Server-side validation schema for the contact form.
 * Mirrors the client-side schema in ContactForm.tsx — both enforce the same
 * four required fields: nombre, correo, telefono, mensaje.
 */
export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre es obligatorio (mínimo 3 caracteres)."),
  correo: z.string().email("Correo electrónico inválido."),
  telefono: z
    .string()
    .trim()
    .min(10, "El teléfono es obligatorio (mínimo 10 dígitos).")
    .regex(/^[\d\s()+-]+$/, "El teléfono sólo puede contener números."),
  mensaje: z
    .string()
    .trim()
    .min(10, "El mensaje es obligatorio (mínimo 10 caracteres)."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
