import logo from "@/assets/images/logo.png";

export const site = {
  name: "Empaques Industriales ALPA",
  legalName: "Empaques Industriales Alpa S.A. de C.V.",
  shortName: "AlpaCorp",
  tagline: "Tarimas y Empaques Industriales",
  description:
    "Empaques Industriales ALPA, líder en empaques de madera desde 1992. Nuestro equipo altamente capacitado se dedica a satisfacer las necesidades de nuestros clientes, priorizando relaciones comerciales a largo plazo.",
  logo,
  logoAlt: "Logotipo de Empaques Industriales ALPA",
};

export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Quienes Somos", href: "/quienes-somos" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const contact = {
  emailLabel: "Correo:",
  email: "ventas@alpacorp.mx",
  emailHref: "mailto:ventas@alpacorp.mx",
  phone: "81 1535 3240",
  phoneHref: "tel:+528115353240",
  address: "Calle Benito Juárez #2521, Col. Guadalupe Victoria, Guadalupe, N.L.",
  addressHref:
    "https://maps.google.com/?q=Empaques+Industriales+Alpa+S.A.+de+C.V.",
  schedule: "Lunes a viernes de 8:00 a 18:00 h",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.3864941791203!2d-100.22220321883286!3d25.658479754653246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662c04a82802b5d%3A0xc95b7724ca5d9be5!2sEmpaques%20Industriales%20Alpa%2C%20S.A.%20De%20C.V.!5e0!3m2!1ses-419!2smx!4v1713377792993!5m2!1ses-419!2smx",
};

export const whatsapp = {
  number: "528115353240",
  label: "Envíanos un WhatsApp",
  message:
    "Hola, me gustaría recibir información sobre sus tarimas y empaques industriales.",
  get href() {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
  },
};

export const footer = {
  about:
    "Más de 30 años fabricando empaques industriales de madera a la medida para la industria de Monterrey y el noreste de México.",
  navTitle: "Navegación",
  contactTitle: "Contacto",
  productsTitle: "Productos",
  copyright: `${site.legalName} ${new Date().getFullYear()} | Todos Los Derechos Reservados`,
};
