import Loader from "@/components/Shared/Loader/Loader";
import Home from "@/pages/Main/Home";
import Gift from "@/pages/Main/Gift";
import { usePromise } from "@/utils/customeFunc";
import { Suspense } from "react";
import Everyday from "@/pages/Main/Everyday";
import Clocks from "@/pages/Main/Clocks";
import Islamic from "@/pages/Main/Islamic";
import SalesPersonDashboard from "@/layouts/SalesPersonLayout";

// Fetch data outside the component to leverage React Suspense
const productPromise = usePromise("/product.json");
const giftPromise = usePromise("/product.json");
const everydayPromise = usePromise("/product.json");
const clockPromise = usePromise("/product.json");
const islamicPromise = usePromise("/product.json");

// Define the main route paths
export const MainRoutePaths = [
  {
    index: true,
    element: (
      <Suspense fallback={<Loader />}>
        <Home productPromise={productPromise} />
      </Suspense>
    ),
  },
  {
    path: "/gift",
    element: (
      <Suspense fallback={<Loader />}>
        <Gift promise={giftPromise} />
      </Suspense>
    ),
  },
  {
    path: "/everyday",
    element: (
      <Suspense fallback={<Loader />}>
        <Everyday promise={everydayPromise} />
      </Suspense>
    ),
  },
  {
    path: "/clocks",
    element: (
      <Suspense fallback={<Loader />}>
        <Clocks promise={clockPromise} />
      </Suspense>
    ),
  },
  {
    path: "/islamic",
    element: (
      <Suspense fallback={<Loader />}>
        <Islamic promise={islamicPromise} />
      </Suspense>
    ),
  },
  {
    path: "/flowers",
    element: (
      <Suspense fallback={<Loader />}>
        <Gift promise={giftPromise} />
      </Suspense>
    ),
  },
  {
    path: "/wall",
    element: (
      <Suspense fallback={<Loader />}>
        <Everyday promise={everydayPromise} />
      </Suspense>
    ),
  },
  {
    path: "/off",
    element: (
      <Suspense fallback={<Loader />}>
        <Gift promise={giftPromise} />
      </Suspense>
    ),
  },
  //sales person dashboard......
  {
    path: "/salesman-dashboard",
    element: (
     <SalesPersonDashboard/>
   
    ),
  },
];
