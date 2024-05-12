import { Route, Routes } from "react-router-dom"
import path from "./utils/path"
import { AboutUs, Home, LayoutPublic, OurAgent, Properties, Search } from "./pages/public"
import { Model } from "./components"
import { useModelStore } from "./store/useModelStore"

function App() {

  const { isShowModel } : any = useModelStore();

  return (
    <div>
      {isShowModel && <Model/>}
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
