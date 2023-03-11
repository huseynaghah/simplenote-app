import { createContext, useState } from "react";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {

    

    const [loginStatus, setloginStatus] = useState(false);
    const [currentuser, setcurrentuser] = useState(JSON.parse(localStorage.getItem("user"))._id)
    const [notes, setNotes] = useState([])

    return <authContext.Provider value={{ loginStatus, setloginStatus, currentuser, setcurrentuser, notes, setNotes }}>{children}</authContext.Provider>

}