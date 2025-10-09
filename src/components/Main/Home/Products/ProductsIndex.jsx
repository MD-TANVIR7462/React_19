import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/Shared/Product/ProductCard";

const Productindex = ({ title, products, onProductClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.section className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-300 ">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-800 my-2"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>

        <motion.button
          className="flex items-center gap-2 hover:text-orange-500/80  font-medium transition-colors group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-sm md:text-base cursor-pointer">View All</span>
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>

      <div className="relative">
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
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
export default Productindex;
