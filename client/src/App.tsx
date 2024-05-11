import { Route, Routes } from "react-router-dom"
import path from "./utils/path"
import { Home, LayoutPublic } from "./pages/public"

function App() {

  return (
    <>
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<LayoutPublic/>}>
          <Route path={path.HOME} element={<Home/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
