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

// ---------------------------------------------------------------------------
// Hero Slider — 3 slides que cuentan la historia de confianza de ALPA
// ---------------------------------------------------------------------------
export const heroSlides = [
  {
    topTag: "TARIMAS Y EMPAQUES INDUSTRIALES",
    title: "Protegemos lo que mueve tu industria.",
    subtitle:
      "Más de 30 años diseñando soluciones de embalaje industrial para empresas que no pueden permitirse fallar.",
    cta: "Solicita una cotización",
    ctaHref: "/contacto",
    image,
    imageAlt: "Tarimas de madera de Empaques Industriales ALPA",
  },
  {
    topTag: "RELACIONES A LARGO PLAZO",
    title: "Llevamos décadas protegiendo las operaciones de las mejores marcas.",
    subtitle:
      "Empresas como Whirlpool confían en ALPA desde hace más de 30 años. No somos un proveedor más: somos parte de su cadena productiva.",
    cta: "Conoce nuestros clientes",
    ctaHref: "/#marcas-ancla",
    image,
    imageAlt: "Almacén de tarimas de madera ALPA",
  },
  {
    topTag: "ECHAR RAÍCES, CRECER JUNTOS",
    title: "Buscamos clientes con visión de largo plazo.",
    subtitle:
      "No fabricamos tarimas. Construimos relaciones. Nos integramos a tu operación, entendemos tus volúmenes y crecemos contigo.",
    cta: "Saber más de nosotros",
    ctaHref: "/quienes-somos",
    image,
    imageAlt: "Equipo de trabajo de Empaques Industriales ALPA",
  },
] as const;

// ---------------------------------------------------------------------------
// Indicadores Clave — métricas que construyen credibilidad
// Actualizar valores cuando ALPA proporcione cifras exactas.
// ---------------------------------------------------------------------------
export const indicadoresClave = {
  topTag: "EN NÚMEROS",
  items: [
    {
      value: "30+",
      label: "Años de experiencia",
      note: "",
    },
    {
      value: "50+",
      label: "Clientes atendidos",
      note: "(actualizar con dato real)",
    },
    {
      value: "HT",
      label: "Certificación NOM-144",
      note: "Exportación internacional",
    },
    {
      value: "Noreste",
      label: "Cobertura geográfica",
      note: "México",
    },
    {
      value: "1993",
      label: "Fundada en",
      note: "Guadalupe, N.L.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Marcas Ancla — empresas grandes con las que ALPA trabaja (o ha trabajado)
// ---------------------------------------------------------------------------
export const marcasAncla = {
  topTag: "CONFIANZA EN NÚMEROS",
  title: "Las marcas líderes confían en ALPA",
  subtitle:
    "Llevamos más de 30 años siendo el socio de embalaje de marcas líderes en México. Seguimos creciendo con ellos.",
  cta: "Ver todos nuestros clientes",
  ctaHref: "/#clientes",
  brands: [
    { name: "Whirlpool", logoKey: "whirlpool", detail: "+30 años de relación continua" },
    { name: "LG Electronics", logoKey: "lg", detail: "Empaques para distribución nacional" },
    { name: "Vitro", logoKey: "vitro", detail: "Soluciones de protección de vidrio" },
    { name: "Mekra Lang", logoKey: "mekraLang", detail: "Logística de embalaje a la medida" },
    { name: "Thermotek", logoKey: "thermotek", detail: "Empaques para HVAC" },
    { name: "Foremes", logoKey: "foremesG", detail: "Embalaje industrial especializado" },
    { name: "Hebel", logoKey: "hebel", detail: "Tarimas para materiales de construcción" },
    { name: "Danfoss", logoKey: "danfoss", detail: "Componentes industriales protegidos" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Problemas que resolvemos — industrias y sus retos de embalaje
// ---------------------------------------------------------------------------
export const problemasIndustrias = {
  topTag: "PROBLEMAS QUE RESOLVEMOS",
  title: "Industrias que no pueden permitirse fallar",
  subtitle:
    "Si tu operación depende de empaques confiables en volúmenes altos, aquí es donde ALPA entra.",
  industries: [
    {
      icon: "factory",
      industry: "Manufactura & Automotriz",
      problem: "Stockout de tarimas que para la línea de producción",
      solution:
        "Administración de inventarios con entregas programadas. Nunca más una línea parada por falta de empaques.",
      badge: "Administración de Inventarios",
    },
    {
      icon: "appliance",
      industry: "Electrodomésticos",
      problem: "Daños al producto durante distribución y transporte",
      solution:
        "Tarimas y empaques diseñados a la medida del producto, con el peso y resistencia exactos que necesita tu línea.",
      badge: "Pallets a la medida",
    },
    {
      icon: "building",
      industry: "Construcción & HVAC",
      problem: "Empaques que no soportan materiales pesados o irregulares",
      solution:
        "Fabricamos tarimas reforzadas y embalaje a la medida para cargas especiales, equipos y materiales de obra.",
      badge: "Personal Inhouse",
    },
    {
      icon: "export",
      industry: "Exportación",
      problem: "Aduanas rechaza el empaque de madera por no tener certificación",
      solution:
        "Tratamiento térmico propio (HT) conforme a NOM-144-SEMARNAT-2017 / NIMF-15. Certificamos y sellamos tu empaque.",
      badge: "Tratamiento HT",
    },
  ],
} as const;
