import React, { useState } from 'react'
import { Routes, Route, Router } from 'react-router'
import { Login } from "../components/Login"
import {PrivateRoute} from './PrivateRoute'
import { Application } from '../components/Application'
import { Signup } from '../components/Signup'
import { Forgot } from '../components/Forgot'

export const PageRoutes = () => {


    return (
        <Routes>

            
            <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Application />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/signup" element={<Signup/>} />
        </Routes>

    )
}
// }