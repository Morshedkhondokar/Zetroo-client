import { Navigate } from "react-router"
import useRole from "../components/hooks/useRole"
import Loading from "../components/Loading/Loading";

const AdminRoute = ({children}) => {
    const {role, isLoading} = useRole();

    if(isLoading) return <Loading/>

    if(role === 'admin') return children

  return<Navigate to={'/dashboard'} replace={true}/>
}

export default AdminRoute
