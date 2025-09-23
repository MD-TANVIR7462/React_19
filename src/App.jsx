import { Suspense, useEffect, useState } from "react";
import ActiveAction from "./MyComponent/ActiveAction";
import Banner from "./MyComponent/Banner";
import Navbar from "./MyComponent/Navbar";
import Loader from "./MyComponent/Loader";
import SearchBox from "./MyComponent/SearchBox";
import { fetchItems } from "./lib/customeFunc";
import Addproduct from "./MyComponent/AddproductBox";

// fetch data end...
const App = () => {
  const data = fetchItems("/items.json");
  const product = fetchItems("https://shipfinity-backend.vercel.app/api/products");

  return (
    <div className="max-w-[1720px] mx-auto">
      <Navbar />
      {/* <Banner /> */}
      {/* <Suspense fallback={<Loader/>}>
        <ActiveAction data={data} />
      </Suspense> */}
      <Suspense fallback={<Loader />}>
        <SearchBox products={product} />
      </Suspense>
      {/* <Addproduct/> */}
    </div>
  );
};

export default App;
