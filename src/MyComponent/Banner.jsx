import { motion } from "framer-motion";
import { Rocket, ChevronRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative min-h-[730px] max-h-[900px]  overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute "></div>
        <img src="/assets/Banner-min.jpg" alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute container mx-auto px-4  flex items-center h-[720px]">
        <div className="max-w-3xl py-6 lg:py-16 px-4 lg:px-10 h-full flex flex-col justify-center ">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-5xl font-bold text-white mb-6"
          >
            Bid on Unique Items from
            <br /> Around the World
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-400 mb-8 max-w-[470px]"
          >
            Discover rare collectibles, luxury goods, and vintage treasures in our curated auctions
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4"
          >
            <button size="lg" className="bg-white text-black/80 px-5 py-2 rounded-4xl flex font-semibold">
              Explore Actions <ChevronRight className="ml-2" />
            </button>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
