"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/pagination";
import { motion } from "framer-motion";
const HeroSlider = () => {
  const slides = [
    {
      id: 3,
      badge: "Home & Living Essentials",
      title: "Your one-stop shop for wholesale",
      description:
        "Furniture, decor, kitchenware, and home essentials. Transform living spaces with our curated wholesale collection.",
      image: "https://testmirtextrading.siscotech.com/admin/views/uploads/slider/md/20221219010100.jpg",
      imageAlt: "Home and living wholesale products",
    },
    {
      id: 4,
      badge: "Beauty & Personal Care",
      title: "Your one-stop shop for wholesale",
      description:
        "Cosmetics, skincare, haircare, and wellness products. Stock your salon or retail store with premium beauty brands.",
      image: "https://testmirtextrading.siscotech.com/admin/views/uploads/slider/md/20221219010122.jpg",
      imageAlt: "Beauty and personal care wholesale",
    },
    {
      id: 5,
      badge: "Sports & Outdoor Equipment",
      title: "Your one-stop shop for wholesale",
      description:
        "Fitness equipment, sports gear, camping essentials, and outdoor adventure products for active lifestyles.",
      image: "https://testmirtextrading.siscotech.com/admin/views/uploads/slider/md/20221219010100.jpg",
      imageAlt: "Sports and outdoor wholesale products",
    },
  ];

  const banners = [
    {
      id: 1,
      badge: "Save $10",
      title: "Dive into Savings on Swimwear",
      price: "$59.99",
      image: "https://testmirtextrading.siscotech.com/home/assets/images/rightSide3.jpg",
      imageAlt: "Swimwear collection",
      type: "swimwear",
    },
    {
      id: 2,
      badge: "Save $10",
      title: "20% off accessories",
      price: "$59.99",
      image: "https://testmirtextrading.siscotech.com/home/assets/images/rightSide2.jpg",
      imageAlt: "Accessories collection",
      type: "accessories",
    },
  ];

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
      <div className="container mx-auto px-4 lg:pt-8">
        <div className="flex flex-col lg:flex-row gap-6 h-full w-full">
          {/* Main Slider */}
          <div className="lg:w-2/3 w-full h-[275px] sm:h-[370px] lg:h-[450px]">
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
              className="w-full h-full rounded-md overflow-hidden [&_.swiper-pagination]:!bottom-6"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  {({ isActive }) => (
                    <div
                      className="relative h-full w-full flex items-center bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${slide?.image})`,
                      }}
                    >
                      {/* Overlay Content */}
                      <div className="relative z-10 px-6 md:px-12 lg:px-16 w-full lg:w-3/5">
                        <div className="space-y-4 lg:space-y-6">
                          {/* Badge */}
                          <motion.span
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-white/80 px-3 py-1 rounded-lg"
                          >
                            {slide.badge}
                          </motion.span>

                          {/* Title */}
                          <motion.h2
                            variants={fadeUp(0.1)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-foreground capitalize"
                          >
                            {slide.title}
                          </motion.h2>

                          {/* Description */}
                          <motion.p
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="text-base md:text-lg text-muted-foreground leading-relaxed"
                          >
                            {slide.description}
                          </motion.p>

                          {/* Button */}
                          <motion.button
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            onClick={handleShopNow}
                            className="inline-block bg-primary text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition"
                          >
                            Shop Now
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
          <div className="lg:w-1/3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 h-full">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  onClick={() => handleBannerClick(banner.type)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 hover:shadow-lg ${
                    index === 1 ? "lg:mt-0" : ""
                  } ${
                    banner.type === "accessories"
                      ? "bg-gradient-to-br from-amber-50 to-orange-50"
                      : "bg-gradient-to-br from-blue-50 to-indigo-50"
                  }`}
                >
                  {/* Content */}
                  <div className="relative z-10 p-6 lg:p-8">
                    <div className="space-y-3">
                      <span
                        className={`inline-block text-xs font-semibold uppercase tracking-wide text-white px-3 py-1 rounded-sm ${
                          banner.type === "accessories" ? "bg-red-500" : "bg-blue-500"
                        }`}
                      >
                        {banner.badge}
                      </span>

                      <h3 className="text-lg md:text-xl font-bold leading-tight text-foreground">{banner.title}</h3>

                      <p className="text-sm text-muted-foreground">
                        Starting at <span className="text-red-500 font-semibold">{banner.price}</span>
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="absolute right-0 top-0 w-1/3 h-full">
                    <img
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
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
