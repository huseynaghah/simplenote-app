import React from 'react'
import { Routes, Route , Router} from 'react-router'
import { Login } from "../components/Login"
import { Application } from '../components/Application'
import { Signup } from '../components/Signup'
import { Forgot } from '../components/Forgot'

export const PageRoutes = () => {
    return (
        <Routes>
            
                {/* <Route path="/" element={<PageLayout />}> */}
                {/* <Route index element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Application />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot" element={<Forgot />} />
            
            {/* </Route> */}
        </Routes>

    )
}
