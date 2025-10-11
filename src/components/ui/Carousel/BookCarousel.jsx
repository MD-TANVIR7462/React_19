import BookViewCard from "@/components/Shared/Product/BookViewCard/BookViewCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const BookCarousel = ({ products, onAddToCart }) => {
  return (
    <div className="relative w-full flex justify-center">
      <Carousel
        className="w-full max-w-6xl"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="space-x-4">
          {products?.map((product, index) => (
            <CarouselItem key={index} className="basis-full flex justify-center items-center px-1 md:px-5">
              {/* ✅ Remove BookViewCard’s outer max-width */}
              <div className="w-full">
                <BookViewCard product={product} onAddToCart={onAddToCart} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="w-10 h-10 left-1 md:left-3" />
        <CarouselNext className="w-10 h-10 right-1 md:right-3" />
      </Carousel>
    </div>
  );
};

export default BookCarousel;
