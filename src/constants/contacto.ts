import image from "@/assets/images/4786.avif";
import heroImage from "@/assets/images/five.avif";

export const banner = {
  title: "Contacto",
  subtitle: "Tarimas y Empaques Industriales",
  image: heroImage,
  imageAlt: "Planta de Empaques Industriales ALPA",
};

export const contactCta = {
  topTag: "ESTAMOS PARA AYUDARTE",
  title: "Hablemos de tu proyecto",
  text: "Cuéntanos qué necesitas transportar, almacenar o exportar y te ayudamos a definir el empaque de madera adecuado.",
  whatsappLabel: "Envíanos un WhatsApp",
};

export const contactForm = {
  topTag: "FORMULARIO",
  title: "Escríbenos",
  text: "Responderemos tu solicitud en el menor tiempo posible.",
  submit: "Enviar",
  submitting: "Enviando...",
  successTitle: "¡Mensaje enviado!",
  successText: "Gracias por escribirnos, te contactaremos muy pronto.",
  errorTitle: "No pudimos enviar tu mensaje",
  errorText: "Inténtalo de nuevo o escríbenos por WhatsApp.",
  fields: {
    nombre: {
      label: "Nombre completo",
      placeholder: "Juan Pérez",
    },
    correo: {
      label: "Correo electrónico",
      placeholder: "correo@empresa.com",
    },
    telefono: {
      label: "Teléfono",
      placeholder: "81 1234 5678",
    },
    mensaje: {
      label: "Mensaje",
      placeholder: "Cuéntanos qué necesitas...",
    },
  },
  errors: {
    nombreMin: "Escribe tu nombre completo (mínimo 3 caracteres).",
    correoInvalid: "Escribe un correo electrónico válido.",
    telefonoMin: "Escribe un teléfono de al menos 10 dígitos.",
    telefonoInvalid: "El teléfono sólo puede contener números.",
    mensajeMin: "Cuéntanos un poco más (mínimo 10 caracteres).",
  },
};

export const mail = {
  /** Remitente verificado en Resend (configurable con CONTACT_FROM_EMAIL). */
  from: "AlpaCorp Web <onboarding@resend.dev>",
  subject: (nombre: string) => `Nuevo mensaje de ${nombre} desde alpacorp.mx`,
};

export const mapSection = {
  topTag: "DÓNDE ESTAMOS",
  title: "Visítanos",
  iframeTitle: "Mapa de ubicación de Empaques Industriales Alpa",
};
