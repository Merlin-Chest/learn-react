import { RouterProvider, useNavigate } from "react-router"

const IndexPage = () => {
  const navigate = useNavigate()
  return <>
    <a onClick={() => navigate('/demo/1')}>demo1: Form/FormItem</a>
  </>
}

export default IndexPage;
