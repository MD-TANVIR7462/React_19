import { use, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";

const AutoScroll = () => {
  const { pathename } = useLocation();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 300,
      smooth: "easeInOutQuad",
    });
  }, [pathename]);
  return null;
};
export default AutoScroll;
