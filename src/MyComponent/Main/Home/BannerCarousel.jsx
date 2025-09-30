"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { banners, slides } from "@/data/Hero-data";
const HeroSlider = () => {
  const handleBannerClick = (type) => {
    console.log(`Navigate to ${type} category`);
    // navigation logic here
  };

  // eslint-disable-next-line no-unused-vars
  const handleShopNow = () => {
    console.log("Navigate to shop");
    // navigation logic here
  };

  //......Framer Motion Variants....//
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay },
    },
  });
  return (
    <section className="w-full bg-background cursor-grab">
      <div className="lg:container mx-auto pt-2 md:pt-4 lg:pt-8">
        <div className="flex flex-col lg:flex-row gap-6 h-full w-full">
          {/* Main Slider */}
          <div className="lg:w-2/3 w-full  h-[340px] sm:h-[420px] md:h-[470px] ">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-primary/30",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
              }}
              modules={[Pagination, Autoplay]}
              className="w-full h-full rounded-sm md:rounded-md overflow-hidden [&_.swiper-pagination]:!bottom-6"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {slides?.map((slide) => (
                <SwiperSlide key={slide?.id}>
                  {({ isActive }) => (
                    <div
                      className="relative h-full w-full flex items-center bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${slide?.image})`,
                      }}
                    >
                      {/* Overlay Content */}
                      <div className="relative z-10 px-6 md:px-12 lg:px-16 w-full sm:w-3/4 lg:w-3/5">
                        <div className="space-y-4 lg:space-y-6">
                          {/* Badge */}
                          <motion.span
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-white/80 px-3 py-1 lg:rounded-lg "
                          >
                            {slide.badge}
                          </motion.span>

                          {/* Title */}
                          <motion.h2
                            variants={fadeUp(0.1)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="text-2xl md:text-4xl lg:text-3xl xl:text-4xl font-bold leading-tight text-foreground capitalize"
                          >
                            {slide.title}
                          </motion.h2>

                          {/* Description */}
                          <motion.p
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="text-[15px] sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                          >
                            {slide.description}
                          </motion.p>

                          {/* Button */}

                          <motion.button
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            onClick={handleShopNow}
                            className="relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md bg-[#61a741] px-5 py-2 text-sm font-medium text-white transition duration-300 ease-out group"
                          >
                            {/* Glow/shine background */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                            {/* Shiny diagonal swipe */}
                            <span className="absolute w-32 h-32 rotate-45 -translate-x-16 -translate-y-20 bg-white opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></span>

                            {/* Button text */}
                            <span className="relative z-10">Shop Now</span>

                            {/* Border outline */}
                            <span className="absolute inset-0 rounded-md border-1 border-green-600/50  opacity-40 group-hover:opacity-100 transition-opacity duration-300"></span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Banner Ads */}
          <div className="lg:w-1/3 w-full hidden lg:block">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 h-full ">
              {banners?.map((banner, index) => (
                <div
                  style={{
                    backgroundImage: `url(${banner.image})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  key={banner.id}
                  onClick={() => handleBannerClick(banner.type)}
                  className={` rounded-md cursor-pointer  transition-all duration-600  ${index === 1 ? "lg:mt-0" : ""}`}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundSize = "110%")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundSize = "100%")}
                >
                  {/* Content */}
                  <div className="relative z-10 p-6 lg:p-8 h-full flex items-end bg-gradient-to-t from-black/10 to-transparent md:rounded-md">
                    <div className="space-y-3">
                      <span
                        className={`inline-block text-xs font-semibold uppercase tracking-wide text-white px-3 py-1 rounded-sm ${
                          banner.type === "accessories" ? "bg-blue-700" : " green-background"
                        }`}
                      >
                        {banner.badge}
                      </span>

                      <h3 className="text-lg md:text-xl font-bold leading-tight text-foreground capitalize">
                        {banner.type}
                      </h3>

                      <p className="text-sm text-black/50 font-semibold">{banner.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
