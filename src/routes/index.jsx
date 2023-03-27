import React, { useState } from 'react'
import { Routes, Route, Router } from 'react-router'
import { Login } from "../components/Login"
import {PrivateRoute} from './PrivateRoute'
import  Container  from '../components/Application/Container'
import { Signup } from '../components/Signup'
import { Forgot } from '../components/Forgot'
import { Verify } from '../components/Signup/Verify'
export const PageRoutes = () => {


    return (
        <Routes>

            
            <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Container />} />
                {/* <Route exact path='/note' element={<Container />} /> */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signup/verify" element={<Verify/>}/>
        </Routes>

    )
}
// }
