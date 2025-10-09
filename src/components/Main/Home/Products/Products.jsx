import { useEffect, useState } from "react";
import Productindex from "./ProductsIndex";
import ProductModal from "@/components/Shared/Product/ProductModal/ProductModal";

const Product = ({ data }) => {
  const [category, setProductCategory] = useState({
    gift: [],
    flowers: [],
    islamic: [],
    wall: [],
    everyday: [],
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //initial data load
  useEffect(() => {
    const gift = data?.filter((item) => item.category === "gift");
    const flowers = data?.filter((item) => item.category === "flowers");
    const islamic = data?.filter((item) => item.category === "islamic");
    const wall = data?.filter((item) => item.category === "wall");
    const everyday = data?.filter((item) => item.category === "everyday");
    setProductCategory({ gift, flowers, islamic, wall, everyday });
  }, [data]);

  //actions
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div>
      <div className=" mx-auto  py-8">
        {category.gift.length > 0 && (
          <Productindex
            key={category.gift.length}
            title={"Gift "}
            products={category.gift}
            onProductClick={handleProductClick}
          />
        )}
        {category.everyday.length > 0 && (
          <Productindex
            key={category.everyday.length}
            title={"everyday "}
            products={category.everyday}
            onProductClick={handleProductClick}
          />
        )}
        {category.islamic.length > 0 && (
          <Productindex
            key={category.islamic.length}
            title={"Islamic "}
            products={category.islamic}
            onProductClick={handleProductClick}
          />
        )}
        {category.flowers.length > 0 && (
          <Productindex
            key={category.flowers.length}
            title={"Flower "}
            products={category.flowers}
            onProductClick={handleProductClick}
          />
        )}
        {category.wall.length > 0 && (
          <Productindex
            key={category.wall.length}
            title={"Wall "}
            products={category.wall}
            onProductClick={handleProductClick}
          />
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Product;
