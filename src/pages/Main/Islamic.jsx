import ProductCard from "@/components/Shared/Product/ProductCard/ProductCard";
import ProductModal from "@/components/Shared/Product/ProductModal/ProductModal";
import { use, useState } from "react";

const Islamic = ({ promise }) => {
  const result = use(promise);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const data = result?.filter((item) => item.category === "islamic");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-2 md:gap-3 lg:gap-4 pb-4 mt-8 ">
      {data?.map((product) => (

        <ProductCard key={product.id} product={product} onClick={handleProductClick} />
      ))}
      {selectedProduct && <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Islamic;
