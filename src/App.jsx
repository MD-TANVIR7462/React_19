import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/All-routes";
import { Toaster } from "sonner";
const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
