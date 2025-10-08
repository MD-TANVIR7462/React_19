import Loader from "@/components/Shared/Loader";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import { usePromise } from "@/utils/customeFunc";
import { Suspense } from "react";

const giftPromise = usePromise({ endpoint: "/product.json" });

export const MainRoutePaths = [
  { index: true, element: <Home /> },
  {
    path: "/gift",
    element: (
      <Suspense fallback={<Loader />}>
        <Shop giftPromise={giftPromise} />
      </Suspense>
    ),
  },
];
