import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import IndexPage from ".."
import Display from "../components/Display"
import FormPage from "../demos/form"

const RouterConfig = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage></IndexPage>}></Route>
      <Route path="/demo" element={<Display></Display>}>
        <Route path="1" element={<FormPage></FormPage>}></Route>
      </Route>
    </Routes >
  </BrowserRouter >
}

export default RouterConfig;
