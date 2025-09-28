import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import { MainRoutePaths } from "./Main-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: MainRoutePaths,
    errorElement: <div>404 Not Found</div>,
  },
]);
