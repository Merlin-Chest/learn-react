import { RouterProvider, useNavigate } from "react-router"

const IndexPage = () => {
  const navigate = useNavigate()
  return <div style={{ display: 'flex', flexFlow: 'column' }}>
    <a onClick={() => navigate('/demo/1')}>demo1: Form/FormItem</a>
    <a onClick={() => navigate('/demo/2')}>demo2: Nested Provider</a>
    <a onClick={() => navigate('/demo/3')}>demo3: Layer Provider</a>
    <a onClick={() => navigate('/demo/4')}>demo4: Theme Change</a>
  </div>
}

export default IndexPage;
