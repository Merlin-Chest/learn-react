import { RouterProvider, useNavigate } from "react-router"

const IndexPage = () => {
  const navigate = useNavigate()
  return <div style={{ display: 'flex', flexFlow: 'column' }}>
    <a onClick={() => navigate('/demo/1')}>Props demo1: Form/FormItem</a>
    <a onClick={() => navigate('/demo/2')}>Provider demo2: Nested Provider</a>
    <a onClick={() => navigate('/demo/3')}>Provider demo3: Layer Provider</a>
    <a onClick={() => navigate('/demo/4')}>Provider demo4: Theme Change</a>
    <a onClick={() => navigate('/demo/5')}>HOC demo5: Change Children</a>
    <a onClick={() => navigate('/demo/6')}>HOC demo6: DynamicComp</a>
    <a onClick={() => navigate('/demo/7')}>HOC demo7: GetInstance</a>
    <a onClick={() => navigate('/demo/8')}>HOC demo8: SetListener</a>
    <a onClick={() => navigate('/demo/9')}>HOC demo9: AuthorityList</a>
  </div>
}

export default IndexPage;
