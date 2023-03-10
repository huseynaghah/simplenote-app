import React , {useState, useContext, useEffect} from 'react'
import { authContext } from '../store/AuthContext';
// import AuthService from './Services/AuthService'
import { Navigate, Outlet } from 'react-router-dom'





export const PrivateRoute = () => {

    // const [status, setstatus] = useState(false)
    
    const {loginStatus, setloginStatus} = useContext(authContext)
    const userInfo = localStorage.getItem("user")

    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if(token){
    //         setstatus(true)
    //     }
    //     console.log("Salamlar", token,loginStatus);
    // }, [])
    


    if (loginStatus || userInfo) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />;

    }
}
