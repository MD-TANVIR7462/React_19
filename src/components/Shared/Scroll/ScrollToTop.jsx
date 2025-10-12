import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    animateScroll.scrollTo(0, { duration: 400, ease: "easeInOutCubic" });
  };
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 1 }}
      aria-label="Scroll to top"
      className={`hidden md:block md:fixed bottom-6 cursor-pointer right-6 z-20 p-3 rounded-full bg-orange-500/80 text-white shadow-lg transition-all duration-300 hover:bg-orange-600/80 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <ArrowUp size={20} />
    </motion.button>
  );
};

export default ScrollToTop;
