import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./utils/router.tsx";

const routers = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routers}></RouterProvider>
);
