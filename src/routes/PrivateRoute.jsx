import React , {useState, useContext, useEffect} from 'react'
import { authContext } from '../store/AuthContext';
// import AuthService from './Services/AuthService'
import { Navigate, Outlet } from 'react-router-dom'





export const PrivateRoute = () => {

    // const [status, setstatus] = useState(false)
    
    const {loginStatus, setloginStatus} = useContext(authContext)

    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if(token){
    //         setstatus(true)
    //     }
    //     console.log("Salamlar", token,loginStatus);
    // }, [])
    


    if (loginStatus) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />;

    }
}
