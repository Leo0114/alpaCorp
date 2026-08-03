import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/a11y";

export interface ClientLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ClientesSliderProps {
  logos: ClientLogo[];
}

export function ClientesSlider({ logos }: ClientesSliderProps) {
  return (
    <Swiper
      modules={[Autoplay, A11y]}
      className="w-full"
      loop={logos.length > 4}
      speed={700}
      autoplay={{ delay: 2200, disableOnInteraction: false }}
      spaceBetween={24}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
      a11y={{ enabled: true }}
    >
      {logos.map((logo) => (
        <SwiperSlide key={logo.src} className="!h-auto">
          <div className="flex h-28 items-center justify-center rounded-2xl border border-line bg-canvas px-6 py-4">
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              className="max-h-16 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:brightness-0 dark:invert"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ClientesSlider;
