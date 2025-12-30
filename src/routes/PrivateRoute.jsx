import { Navigate, useLocation } from "react-router";
import useAuth from "../components/hooks/useAuth"
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation()

    if(loading) return <Loading/>

    if(user) return children
 
  return <Navigate to={'/login'} state={location.pathname} replace={true}/>
}

export default PrivateRoute
