import HeroSlider from "@/components/Main/Home/Banner/BannerCarousel";
import FeatureSummary from "@/components/Main/Home/Featured/FeatureSummary";
import Product from "@/components/Main/Home/Products/Products";
// import AgingReport from "@/components/Reports/AgingReport";


const Home = () => {
  return (
    <>
      <HeroSlider /> 
      <FeatureSummary />
      <Product />
      {/* <AgingReport  /> */}
    </>
  );
};

export default Home;
