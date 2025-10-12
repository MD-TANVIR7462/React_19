import { use, useEffect, useState } from "react";
import ProductCard from "@/components/Shared/Product/ProductCard/ProductCard";
import ProductModal from "@/components/Shared/Product/ProductModal/ProductModal";
import BookCarousel from "@/components/ui/Carousel/BookCarousel";
import BoxGridButton from "@/components/Shared/Product/Buttons/BoxGridButton";

const Clocks = ({ promise }) => {
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

  const data = result?.filter((item) => item.category === "clocks");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  return (
    <div className="py-2 sm:py-3 lg:py-5">
      <BoxGridButton setViewMode={setViewMode} viewMode={viewMode} />
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

export default Clocks;
