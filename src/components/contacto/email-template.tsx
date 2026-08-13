import * as React from "react";
import type { ContactFormData } from "./contact.schema";

// ─── Design tokens (AlpaCorp brand) ─────────────────────────────────────────
const BRAND = {
  primary: "#262a73",   // Deep blue — brand primary
  shade: "#1b1f57",     // Darker shade for gradients
  secondary: "#33ce31", // Vibrant green — brand secondary
  accent: "#2ab828",    // Green accent darker
  surface: "#ffffff",
  surface2: "#f3f4f9",
  ink: "#101223",
  muted: "#5b6076",
  border: "#e3e5ef",
} as const;

// ─── Inline styles (email-safe, no CSS classes) ─────────────────────────────
const s = {
  wrapper: {
    fontFamily:
      "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: BRAND.surface2,
    padding: "40px 20px",
    margin: 0,
  } as React.CSSProperties,

  card: {
    maxWidth: 600,
    margin: "0 auto",
    backgroundColor: BRAND.surface,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  header: {
    background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.shade} 100%)`,
    padding: "36px 40px",
  } as React.CSSProperties,

  logoBadge: {
    display: "inline-block",
    backgroundColor: BRAND.secondary,
    borderRadius: 8,
    padding: "5px 14px",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: 16,
  } as React.CSSProperties,

  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,

  headerSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    margin: "6px 0 0",
    fontWeight: 400,
  } as React.CSSProperties,

  body: {
    padding: "32px 40px",
  } as React.CSSProperties,

  greeting: {
    fontSize: 16,
    color: BRAND.ink,
    marginBottom: 24,
    lineHeight: 1.6,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: BRAND.primary,
    margin: "0 0 12px",
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 12,
  } as React.CSSProperties,

  fieldBox: {
    backgroundColor: BRAND.surface2,
    borderRadius: 10,
    padding: "12px 16px",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  fieldBoxFull: {
    backgroundColor: BRAND.surface2,
    borderRadius: 10,
    padding: "12px 16px",
    border: `1px solid ${BRAND.border}`,
    marginBottom: 12,
  } as React.CSSProperties,

  fieldLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: BRAND.muted,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 2,
  } as React.CSSProperties,

  fieldValue: {
    fontSize: 14,
    color: BRAND.ink,
    fontWeight: 500,
    margin: 0,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: `1px solid ${BRAND.border}`,
    margin: "24px 0",
  } as React.CSSProperties,

  messageBox: {
    backgroundColor: `${BRAND.primary}0A`,
    border: `1px solid ${BRAND.primary}22`,
    borderRadius: 10,
    padding: "16px",
    marginBottom: 24,
  } as React.CSSProperties,

  messageText: {
    fontSize: 14,
    color: BRAND.ink,
    lineHeight: 1.7,
    margin: 0,
    whiteSpace: "pre-wrap" as const,
  } as React.CSSProperties,

  cta: {
    display: "block",
    backgroundColor: BRAND.secondary,
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: 999,
    padding: "14px 28px",
    fontWeight: 700,
    fontSize: 14,
    textAlign: "center" as const,
    marginBottom: 24,
  } as React.CSSProperties,

  footer: {
    borderTop: `1px solid ${BRAND.border}`,
    padding: "20px 40px",
    backgroundColor: BRAND.surface2,
    textAlign: "center" as const,
  } as React.CSSProperties,

  footerText: {
    fontSize: 12,
    color: BRAND.muted,
    margin: 0,
    lineHeight: 1.6,
  } as React.CSSProperties,

  accentBar: {
    height: 4,
    background: `linear-gradient(90deg, ${BRAND.secondary} 0%, ${BRAND.primary} 100%)`,
  } as React.CSSProperties,
};

// ─── Field component ────────────────────────────────────────────────────────
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={s.fieldBox}>
      <span style={s.fieldLabel}>{label}</span>
      <p style={s.fieldValue}>{value}</p>
    </div>
  );
}

// ─── Email Template ─────────────────────────────────────────────────────────
export function EmailTemplate({ nombre, correo, telefono, mensaje }: ContactFormData) {
  const replySubject = encodeURIComponent("Re: Contacto desde alpacorp.mx");
  const replyBody = encodeURIComponent(
    `Hola ${nombre},\n\nGracias por contactarnos. En breve te daremos seguimiento.\n\nSaludos,\nEquipo AlpaCorp`,
  );
  const gmailLink = `https://mail.google.com/mail/?view=cm&to=${correo}&su=${replySubject}&body=${replyBody}`;

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        {/* ── Accent bar ── */}
        <div style={s.accentBar} />

        {/* ── Header ── */}
        <div style={s.header}>
          <div style={s.logoBadge}>AlpaCorp</div>
          <h1 style={s.headerTitle}>Nuevo mensaje de contacto</h1>
          <p style={s.headerSubtitle}>
            {nombre} ha enviado una solicitud desde el sitio web.
          </p>
        </div>

        {/* ── Body ── */}
        <div style={s.body}>
          {/* Greeting */}
          <p style={s.greeting}>
            Hola equipo 👋, han recibido un nuevo mensaje de{" "}
            <strong>{nombre}</strong>.
          </p>

          {/* Contact info section */}
          <p style={s.sectionTitle}>Información de contacto</p>

          <div style={s.grid}>
            <Field label="Nombre completo" value={nombre} />
            <Field label="Teléfono" value={telefono} />
          </div>

          <div style={s.fieldBoxFull}>
            <span style={s.fieldLabel}>Correo electrónico</span>
            <p style={s.fieldValue}>{correo}</p>
          </div>

          <hr style={s.divider} />

          {/* Message section */}
          <p style={s.sectionTitle}>Mensaje</p>

          <div style={s.messageBox}>
            <p style={s.messageText}>{mensaje}</p>
          </div>

          {/* CTA reply button */}
          <a href={gmailLink} style={s.cta}>
            Responder a {nombre} →
          </a>
        </div>

        {/* ── Footer ── */}
        <div style={s.footer}>
          <p style={s.footerText}>
            Este correo fue generado automáticamente por el formulario de
            contacto de <strong>alpacorp.mx</strong>. Por favor no respondas
            directamente a este mensaje.
          </p>
          <p style={{ ...s.footerText, marginTop: 8 }}>
            © {new Date().getFullYear()} Empaques Industriales Alpa · Todos los
            derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
