import { use, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";

const AutoScroll = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};
export default AutoScroll;
