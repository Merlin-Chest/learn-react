import { RouterProvider, useNavigate } from "react-router"

const IndexPage = () => {
  const navigate = useNavigate()
  return <div style={{
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start'
  }}>
    <button onClick={() => navigate('/demo/1')}>Props demo1: Form/FormItem</button>
    <button onClick={() => navigate('/demo/2')}>Provider demo2: Nested Provider</button>
    <button onClick={() => navigate('/demo/3')}>Provider demo3: Layer Provider</button>
    <button onClick={() => navigate('/demo/4')}>Provider demo4: Theme Change</button>
    <button onClick={() => navigate('/demo/5')}>HOC demo5: Change Children</button>
    <button onClick={() => navigate('/demo/6')}>HOC demo6: DynamicComp</button>
    <button onClick={() => navigate('/demo/7')}>HOC demo7: GetInstance</button>
    <button onClick={() => navigate('/demo/8')}>HOC demo8: SetListener</button>
    <button onClick={() => navigate('/demo/9')}>HOC demo9: AuthorityList</button>
    <button onClick={() => navigate('/demo/10')}>RenderOptimize demo10: Time Slicing</button>
    <button onClick={() => navigate('/demo/11')}>RenderOptimize demo11: VirtualList</button>
  </div>
}

export default IndexPage;
