import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router";

import SalesPersonLayout from "@/layouts/SalesPersonLayout";
import { MainRoutePaths } from "./Main-routes";
import { SalesPersonRoutePaths } from "./SalesPerson-routes";
import SalesOrderInvoice from "@/components/Reports/AgingReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: MainRoutePaths,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/salesman-dashboard",
    element: <SalesPersonLayout />,
    children: SalesPersonRoutePaths,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/sales-order-report",
    element: <SalesOrderInvoice />,
  },
]);
