import ProductCard from "@/components/Shared/Product/ProductCard/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const ProductCarousel = ({ products, onClick }) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  return (
    <Carousel
      className="w-full px-1 "
      opts={{
        align: "start",
        slideToScroll: 1,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <CarouselContent className="" >
        {products?.map((product, index) => (
          <CarouselItem key={index} className=" basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 my-2 px-1">
            <ProductCard key={product.id} product={product} onClick={onClick} />
          </CarouselItem>
        ))}
      </CarouselContent >
      <CarouselPrevious />
      <CarouselNext  />
    </Carousel>
  );
};

export default ProductCarousel;
