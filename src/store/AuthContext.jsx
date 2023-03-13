import { createContext, useState } from "react";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {

    // let usercheker = () => {
    //     if(localStorage.getItem("user")){
    //         return JSON.parse(localStorage.getItem("user"))
    //     }else{
    //         return null 
    //     }
    // }

    const [loginStatus, setloginStatus] = useState(false);
    const [currentuser, setcurrentuser] = useState(JSON.parse(localStorage.getItem("user")))

    return <authContext.Provider value={{ loginStatus, setloginStatus, currentuser, setcurrentuser }}>{children}</authContext.Provider>

}