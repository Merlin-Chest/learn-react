import { Outlet, useNavigate } from 'react-router';
import './index.css'
const Display = () => {
  const navigate = useNavigate()
  return <>
    <div className="content">
      <Outlet />
    </div>
    <button onClick={() => navigate('/')}>back</button>
  </>

}

export default Display;
