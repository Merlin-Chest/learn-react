import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import IndexPage from ".."
import Display from "../components/Display"
import FormPage from "../demos/form"
import { LayerProvider } from "../demos/Provider/layer"
import { NestedProvider } from "../demos/Provider/nested"
import ThemeChange from "../demos/Provider/themeChange"

const RouterConfig = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage></IndexPage>}></Route>
      <Route path="/demo" element={<Display></Display>}>
        <Route path="1" element={<FormPage></FormPage>}></Route>
        <Route path="2" element={<NestedProvider></NestedProvider>}></Route>
        <Route path="3" element={<LayerProvider></LayerProvider>}></Route>
        <Route path="4" element={<ThemeChange></ThemeChange>}></Route>
      </Route>
    </Routes >
  </BrowserRouter >
}

export default RouterConfig;
