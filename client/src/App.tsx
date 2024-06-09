import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import {
  AboutUs,
  Home,
  LayoutPublic,
  OurAgent,
  Properties,
  Search,
} from "./pages/public";
import { Model } from "./components";
import { useModelStore } from "./store/useModelStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import {
  AdminLayout,
  CreatePropertyType,
  DashBoard,
  ManagePropertyType,
} from "./pages/admin";
import { Personal, UserLayout } from "./pages/user";

function App() {
  const { isShowModel }: any = useModelStore();
  const { getUserCurrent, getRoles, token }: any = useUserStore();

  useEffect(() => {
    getUserCurrent();
    getRoles();
  }, [token]);

  return (
    <div>
      {isShowModel && <Model />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* User */}

        <Route path={path.PUBLIC_LAYOUT} element={<LayoutPublic />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUR_AGENTS} element={<OurAgent />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.SEARCH} element={<Search />} />
        </Route>

        {/* Admin */}
        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.ADMIN_DASHBOARD} element={<DashBoard />}></Route>
          <Route
            path={path.ADMIN_CREATE_PROPERTY_TYPE}
            element={<CreatePropertyType />}
          ></Route>
          <Route
            path={path.ADMIN_MANAGE_PROPERTY_TYPE}
            element={<ManagePropertyType />}
          ></Route>
        </Route>

        {/* User */}
        <Route path={path.USER_LAYOUT} element={<UserLayout />}>
          <Route path={path.USER_PERSONAL} element={<Personal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
