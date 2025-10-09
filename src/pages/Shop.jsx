import ProductCard from "@/components/Shared/Product/ProductCard/ProductCard";
import { motion } from "framer-motion";
import { use } from "react";

const Shop = ({ giftPromise }) => {
  const giftData = use(giftPromise);

  const gift = giftData?.filter((item) => item.category === "gift");
  console.log(giftData);
  return (
    <div>
      {gift?.map((item, index) => (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-2 md:gap-3 lg:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {products?.map((product) => (
            <ProductCard key={item.id} product={item} onClick={onProductClick} />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default Shop;
