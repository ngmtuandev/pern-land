import { Route, Routes } from "react-router-dom"
import path from "./utils/path"
import { AboutUs, Home, LayoutPublic, OurAgent, Properties, Search } from "./pages/public"
import { Model } from "./components"
import { useModelStore } from "./store/useModelStore"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from "./store/useUserStore"
import { useEffect } from "react"



function App() {

  const { isShowModel } : any = useModelStore();
  const { getUserCurrent, current } : any = useUserStore();

  useEffect(() => {
    getUserCurrent();
    console.log('test user get current ->>>>', current);
  }, [])

  return (
    <div>
      {isShowModel && <Model/>}
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
        <Route path={path.PUBLIC_LAYOUT} element={<LayoutPublic/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.ABOUT_US} element={<AboutUs/>}/>
          <Route path={path.OUR_AGENTS} element={<OurAgent/>}/>
          <Route path={path.PROPERTIES} element={<Properties/>}/>
          <Route path={path.SEARCH} element={<Search/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
