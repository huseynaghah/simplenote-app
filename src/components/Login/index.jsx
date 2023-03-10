import React , {useRef, useEffect, useContext}from 'react'
import styles from "./index.module.css"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import axios from 'axios';
import { authContext } from '../../store/AuthContext'

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(16).required(),
}).required();

export const Login = () => {

    const { loginStatus, setloginStatus } = useContext(authContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    let navigate = useNavigate()
    const onSubmit =  async (data) => {
        await axios.post("http://localhost:8090/api/users/signin", data)
        .then(async (res)=>{
            await localStorage.setItem('token', res.data.token);
            setloginStatus(true)
            localStorage.setItem("user",JSON.stringify(res.data.userInf))
            console.log(res);
            navigate("/");

        })
        .catch((err)=>{alert("Username or password is incorrect")})
        
    };


    const checkVal = (e) => {
        if (e.target.value.length > 4) {
            e.target.setCustomValidity("");
        } else {
            e.target.setCustomValidity("Password must be at least 4 characters");
        }
    }

    console.log(errors);

    const inputReference = useRef(null);

    // useEffect(() => {
    //     inputReference.current.focus();
    // }, []);


    return (<>
        <div className={styles.container}>
            <div className='container'>
            </div>
            <svg className="logo" width={96} height={96} style={{ minHeight: '96px', minWidth: '96px' }} viewBox="0 0 176 176">
                <g fillRule="evenodd" clipRule="evenodd">
                    <circle cx={88} cy={88} r={88} fill="transparent" />
                    <path d="M152.37 87.885c0-34.066-27.182-63.42-59.45-64.854-6.416-.284-12.647 1.432-17.58 5.573-5.002 4.196-8.07 10.09-8.638 16.595C65.43 59.73 78.537 68.618 91.225 72.09c30.69 8.398 48.462 30.086 46.655 56.757 9.057-11.194 14.49-25.442 14.49-40.962zM84.345 97.24c-28.696-7.853-45.817-29.174-43.62-54.317.027-.287.073-.567.102-.852C29.19 53.846 22 70.023 22 87.886c0 34.348 27.955 63.828 60.277 64.933 7.227.248 14.214-1.685 19.766-6.344 5.67-4.757 9.146-11.435 9.79-18.808 1.703-19.463-16.492-27.417-27.488-30.426z" fill="#3361cc" />
                </g>
            </svg>
            <h1 className={styles.h1}>Log in</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input {...register("email", {required: true})} className={styles.input} placeholder="Email" type="email"/>
                <input {...register("password", { required: true })} className={styles.input} placeholder="Password" type="password" onInput={checkVal} pattern='.{4,}' />
                {errors.password && <span></span>}
                <input type="submit" className={styles.inpSubmit} value="Log in" />
                <div className={styles.remembercont}>
                    <input type="checkbox" name="remember" id="check" {...register("remember")} />
                    <label htmlFor="remember" className={styles.remember}>Remember Me</label>
                </div>
                <a href='/forgot' className={styles.forgot}>Forgot your password?</a>
                <span className={styles.or}>Or</span>
                <span className={styles.orline}></span>
                <a className={styles.wrdprs} href="#">
                    Log in with WordPress.com
                </a>
                <p className={styles.signup}>Don't have an account?<a href="/signup" className={styles.signupa}>Sign up</a></p>
            </form>
        </div>
    </>
    )
}
