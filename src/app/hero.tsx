import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";  // Asegúrate de importar el estilo para Autoplay
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import './globals.css'; // Asegúrate de que la ruta sea correcta

export const Hero: React.FC = () => {
  const slides = [
    {
      image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/hero's/hero.jpg",
      logo: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/hero's/ciencia.png?t=2024-12-06T18%3A09%3A37.352Z",
      title: (
        <>
          APASIONADOS POR LA <br />INVESTIGACIÓN
        </>
      ),
    },
    {
      image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/hero's/noticia1.png?t=2024-12-08T06%3A31%3A12.213Z",
      title: "REPOSITORIO DIGITAL DE LA UPQROO",
      text: "¡Ya está disponible nuestro repositorio digital universitario!"
    },
    {
      image: "https://uiwtngjlfztpkkvirvkb.supabase.co/storage/v1/object/public/hero's/noticia2.jpg?t=2024-12-08T06%3A57%3A27.623Z",
      title: "ÚNETE",
      text: (
        <>
          Regístrate y espera a la revisión para convertirte en un investigador oficial de ScireHub o envía tu solicitud a:<br/>
          <a
            href="mailto:job.diaz@upqroo.edu.mx"
            className="text-white underline"
            target="_blank" // Abre en una nueva pestaña
            rel="noopener noreferrer"
          >
            job.diaz@upqroo.edu.mx
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="relative">
      <Swiper
        pagination={{ clickable: true }}
        navigation={false}
        loop={true}
        autoplay={{
          delay: 5000, // Tiempo en milisegundos (5000 ms = 5 segundos)
          disableOnInteraction: false, // El carrusel no se detendrá al interactuar
        }}
        modules={[Pagination, Navigation, Autoplay]} // Incluye el módulo Autoplay
        className="h-[400px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Imagen */}
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
              {/* Gradiente limitado al tamaño de la imagen */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
              {/* Contenedor de logo y título */}
              <div className="absolute bottom-10 w-full px-4 text-center">
                <div className="flex items-center justify-center space-x-4">
                  {/* Logo */}
                  {index === 0 && slide.logo && (
                    <img
                      src={slide.logo}
                      className="w-16 sm:w-20 md:w-28 h-auto"
                      alt={`Logo ${index}`}
                    />
                  )}
                  {/* Título */}
                  <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold text-white">
                    {slide.title}
                  </h1>
                </div>
                {/* Texto adicional debajo del título */}
                {slide.text && (
                  <p className="text-white text-sm sm:text-md mt-2">
                    {slide.text}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
