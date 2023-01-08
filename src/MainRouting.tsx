import React, {useEffect} from 'react'
import Auth from './components/Auth/Auth'
import Dash from './components/Dash'
import Login from './components/Login'
import Register from './components/Register'
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AuthAxios } from './services/api'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectCurrentToken, selectCurrentUser, setCredentials } from './features/auth/authSlice'
import Loading from './components/Loading'

const ProtectedRoute = ({ children,}: any) => {
  
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default function MainRouting() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser)
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    const t = localStorage.getItem('auth');
    const saveLocation = location.pathname;
    if(t && !user) {
      console.log("NO user wtf?")
      navigate('/loading')
      AuthAxios.post('/users/verify')
        .then((res) => {
          console.log(res)
          dispatch(setCredentials(res.data));
          if(saveLocation === '/' || saveLocation === '/register') {
            navigate('/dash')
          } else {
            navigate(-1);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate('/', {replace: true});
        });
    }

  }, [])



  return (
    <Routes>
        <Route path='/' element={<Auth />}>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/dash' element={<Dash />}/>
        <Route path='/loading' element={<Loading />} />
    </Routes>
  )
}
