import logo from "@/assets/images/logo.png";
import image from "@/assets/images/4786.avif";

export const heroIntro = {
  cards: [
    {
      title: "Nuestros productos",
      text: "Soluciones de madera diseñadas a la medida y necesidad del cliente.",
      cta: "Saber más",
      href: "#productos",
      image,
      alt: "Tarimas de madera fabricadas por Empaques Industriales ALPA",
      featured: true,
    },
    {
      title: "Nuestros Servicios",
      text: "Procesos flexibles: desde un simple pallet hasta la administración de tu inventario.",
      cta: "Saber más",
      href: "#servicios",
      image,
      alt: "Servicios de empaque industrial de madera",
      featured: false,
    },
    {
      title: "Quienes Somos",
      text: "Más de 30 años fabricando empaques industriales de madera en Monterrey.",
      cta: "Saber más",
      href: "#nuestra-empresa",
      image,
      alt: "Planta de Empaques Industriales ALPA",
      featured: false,
    },
  ],
};

export const nuestraEmpres = {
  title: "Empaques Industriales ALPA",
  topTag: "NUESTRA EMPRESA",
  bgButton: "Saber más",
  href: "/quienes-somos",
  p1: "Desde su establecimiento en 1993 por el Ing. Alfonso Antillón, nuestra empresa se ha comprometido con el suministro de empaques industriales de madera para satisfacer las necesidades de la industria en Monterrey.",
  p2: "Nos especializamos en el manejo de maderas de pino, tanto nacionales como importadas, para la fabricación de productos que responden a las demandas específicas de nuestros clientes. Nuestra misión es proporcionar soluciones que optimicen el uso de sus recursos y aseguren la protección efectiva de sus productos, todo respaldado por un servicio de calidad impecable.",
  p3: "Con más de 30 años de experiencia en el mercado, hemos perfeccionado la producción de empaques industriales de madera de alta calidad. Continuamos avanzando y aceptando nuevos desafíos para seguir creciendo y superando las expectativas de nuestros clientes.",
  image,
  imageAlt: "Fabricación de tarimas de madera en ALPA",
  logo,
  logoAlt: "Logotipo de Empaques Industriales ALPA",
};

export const productosSection = {
  topTag: "NUESTROS PRODUCTOS",
  title: "Soluciones de madera diseñadas a la medida y necesidad del cliente",
  cta: "Saber más",
  ctaAll: "Ver todos los productos",
  href: "/productos",
};

export const ctaComponent = {
  title: "NUESTROS SERVICIOS",
  topTag: "PROFESIONALES",
  p1: "Nuestros procesos productivos y administrativos se flexibilizan a la necesidad de nuestros clientes, donde proveemos desde un simple pallet hasta un sistema de administración de inventarios con el cual el cliente no se tiene que preocupar por niveles de inventario o por caer en stockout.",
  bgButton: "Contáctanos",
  href: "/contacto",
  image,
  imageAlt: "Almacén de tarimas de madera",
};

export const serviciosSection = {
  topTag: "PROFESIONALES",
  title: "Nuestros Servicios",
  cta: "Saber más",
};

export const clientesSection = {
  topTag: "NUESTROS CLIENTES",
  title: "Principales clientes con los que hemos trabajado",
  logoAlt: "Logotipo de cliente de Empaques Industriales ALPA",
};
