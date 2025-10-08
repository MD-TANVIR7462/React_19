import ProductModal from "@/components/Shared/ProductModal";
import { fetchItems } from "@/utils/customeFunc";
import { useEffect, useState } from "react";
import Productindex from "./ProductsIndex";

const Product = () => {
  const [productData, setProductData] = useState(null);
  const [category, setProductCategory] = useState({
    gift: [],
    flowers: [],
    islamic: [],
    wall: [],
    everyday: [],
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //initial data load
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchItems("/product.json");
        const gift = data?.filter((item) => item.category === "gift");
        const flowers = data?.filter((item) => item.category === "flowers");
        const islamic = data?.filter((item) => item.category === "islamic");
        const wall = data?.filter((item) => item.category === "wall");
        const everyday = data?.filter((item) => item.category === "everyday");
        setProductCategory({ gift, flowers, islamic, wall, everyday });
        setProductData(data);
      } catch (err) {
        setError(err ? err.message : "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  //actions

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

//  if (isLoading) {
//     return <Loader />;
//   }
 
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
