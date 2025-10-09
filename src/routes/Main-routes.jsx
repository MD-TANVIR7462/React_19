import Loader from "@/components/Shared/Loader/Loader";
import Home from "@/pages/Main/Home";
import Gift from "@/pages/Main/Gift";
import { usePromise } from "@/utils/customeFunc";
import { Suspense } from "react";
import Everyday from "@/pages/Main/Everyday";

// Fetch data outside the component to leverage React Suspense
const productPromise = usePromise("/product.json");
const giftPromise = usePromise("/product.json");
const everydayPromise = usePromise("/product.json");


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
        <Gift giftPromise={giftPromise} />
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
];
