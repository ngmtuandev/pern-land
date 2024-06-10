import { Outlet } from "react-router-dom";
import { Model } from "./components";
import { useModelStore } from "./store/useModelStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";


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
      <Outlet></Outlet>
    </div>
  );
}

export default App;
