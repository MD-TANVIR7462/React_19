import HeroSlider from "@/components/Main/Home/Banner/BannerCarousel";
import FeatureSummary from "@/components/Main/Home/Featured/FeatureSummary";
import Product from "@/components/Main/Home/Products/Products";
import { use } from "react";
// import AgingReport from "@/components/Reports/AgingReport";

const Home = ({ productPromise }) => {
  const productData = use(productPromise);
  return (
    <>
      <HeroSlider />
      <FeatureSummary />
      <Product data={productData} />
      {/* <AgingReport  /> */}
    </>
  );
};

export default Home;
