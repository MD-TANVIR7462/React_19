import { RouterProvider } from "react-router-dom";

import './index.css';
import { router } from "./routes/All-routes";
import ScrollToTop from "./components/Shared/Scroll/ScrollToTop";
const App = () => {
  return (
    <>     <ScrollToTop />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
