import logo from "@/assets/images/logo.png";
import type { Lang } from "@/i18n/ui";
import { getI18N } from "@/i18n/i18n";
import { localizePath } from "@/i18n/utils";

export const site = {
  logo,
};

export const getNavLinks = (lang: Lang) => {
  const i18n = getI18N(lang);
  return [
    { label: i18n.nav.home, href: localizePath(lang, "index") },
    { label: i18n.nav.about, href: localizePath(lang, "about") },
    { label: i18n.nav.products, href: localizePath(lang, "products") },
    { label: i18n.nav.contact, href: localizePath(lang, "contact") },
  ];
};

export const contact = {
  email: "ventas@alpacorp.mx",
  emailHref: "mailto:ventas@alpacorp.mx",
  phone: "81 1535 3240",
  phoneHref: "tel:+528115353240",
  addressHref:
    "https://maps.google.com/?q=Empaques+Industriales+Alpa+S.A.+de+C.V.",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.3864941791203!2d-100.22220321883286!3d25.658479754653246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662c04a82802b5d%3A0xc95b7724ca5d9be5!2sEmpaques%20Industriales%20Alpa%2C%20S.A.+De+C.V.!5e0!3m2!1ses-419!2smx!4v1713377792993!5m2!1ses-419!2smx",
};

export const getWhatsapp = (lang: Lang) => {
  const i18n = getI18N(lang);
  const number = "528115353240";
  const message = i18n.whatsapp.message;
  return {
    number,
    label: i18n.whatsapp.label,
    message,
    href: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
  };
};
