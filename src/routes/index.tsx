import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import IndexPage from ".."
import Display from "../components/Display"
import FormPage from "../demos/form"
import AuthorityList from "../demos/HOC/AuthorityList"
import ChangeChildren from "../demos/HOC/ChangeChildren"
import DynamicComp from "../demos/HOC/DynamicHoc"
import GetInstance from "../demos/HOC/GetInstance"
import SetListener from "../demos/HOC/setListener"
import { LayerProvider } from "../demos/Provider/layer"
import { NestedProvider } from "../demos/Provider/nested"
import ThemeChange from "../demos/Provider/ThemeChange"
import TimeSlicing from "../demos/TimeSlicing"
import VirtualList from "../demos/VirtualList"

const RouterConfig = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage></IndexPage>}></Route>
      <Route path="/demo" element={<Display></Display>}>
        <Route path="1" element={<FormPage></FormPage>}></Route>
        <Route path="2" element={<NestedProvider></NestedProvider>}></Route>
        <Route path="3" element={<LayerProvider></LayerProvider>}></Route>
        <Route path="4" element={<ThemeChange></ThemeChange>}></Route>
        <Route path="5" element={<ChangeChildren></ChangeChildren>}></Route>
        <Route path="6" element={<DynamicComp></DynamicComp>}></Route>
        <Route path="7" element={<GetInstance></GetInstance>}></Route>
        <Route path="8" element={<SetListener></SetListener>}></Route>
        <Route path="9" element={<AuthorityList></AuthorityList>}></Route>
        <Route path="10" element={<TimeSlicing></TimeSlicing>}></Route>
        <Route path="11" element={<VirtualList></VirtualList>}></Route>
      </Route>
    </Routes >
  </BrowserRouter >
}

export default RouterConfig;
