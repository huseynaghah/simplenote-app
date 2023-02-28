import React , {useState} from 'react'
// import AuthService from './Services/AuthService'
import { Navigate, Outlet } from 'react-router-dom'




export const PrivateRoute = () => {

    const [isLogged, setisLogged] = useState(true);

    if (isLogged) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />;

    }
}
