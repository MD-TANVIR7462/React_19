import Loader from "@/components/Shared/Loader/Loader";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import { usePromise } from "@/utils/customeFunc";
import { Suspense } from "react";

// Fetch data outside the component to leverage React Suspense
const productPromise = usePromise("/product.json");
const giftPromise = usePromise("/product.json");


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
        <Shop giftPromise={giftPromise} />
      </Suspense>
    ),
  },
];
