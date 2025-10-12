import { use, useEffect, useState } from "react";
import { Grid3x3, BookOpen } from "lucide-react";
import ProductCard from "@/components/Shared/Product/ProductCard/ProductCard";
import ProductModal from "@/components/Shared/Product/ProductModal/ProductModal";
import BookCarousel from "@/components/ui/Carousel/BookCarousel";

const Islamic = ({ promise }) => {
  const result = use(promise);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const handleProductClick = (product) => {
    if (viewMode === "grid") {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleAddToCart = (productWithQuantity) => {
    console.log("Added to cart:", productWithQuantity);
  };

  const data = result?.filter((item) => item.category === "islamic");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  return (
    <div className="py-2 sm:py-3 lg:py-5">
      <div className="fixed w-fit right-6 top-[30%] md:top-[40%] z-50 justify-end items-center gap-3 mb-6 mt-8">
        <div className="flex bg-white rounded-sm border border-gray-500/20 overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center px-2 sm:px-4 py-2 transition-colors duration-200 cursor-pointer ${
              viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("book")}
            className={`flex items-center px-2 md:px-4 py-2 transition-colors duration-200 cursor-pointer ${
              viewMode === "book" ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 lg:gap-4">
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} onClick={handleProductClick} />
          ))}
        </div>
      ) : (
        <BookCarousel products={data} onAddToCart={handleAddToCart} />
      )}

      {selectedProduct && <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Islamic;
