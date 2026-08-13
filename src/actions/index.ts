import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";
import { contactSchema } from "@/components/contacto/contact.schema";
import { EmailTemplate } from "@/components/contacto/email-template";
import { renderToString } from "react-dom/server";
import React from "react";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "json",
    input: contactSchema,
    handler: async (data) => {
      // ── 1. Render React component to HTML string ─────────────────────────
      const htmlOutput = renderToString(
        React.createElement(EmailTemplate, data),
      );

      // ── 2. Send email via Resend ─────────────────────────────────────────
      const { data: resendData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["ventas@alpacorp.mx"],
        replyTo: data.correo,
        subject: `Nuevo contacto: ${data.nombre}`,
        html: htmlOutput,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true, id: resendData?.id };
    },
  }),
};
