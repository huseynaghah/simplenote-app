import React, {useEffect, useContext, useState} from 'react'
// import  {Left } from './components/Left'
import SwipeableTemporaryDrawer from './components/Left'
import Right from './components/Right'
import styles from "./index.module.css"
import { authContext } from '../../store/AuthContext'
import axios from 'axios'



export const Application= () => {


  const {currentuser, notes, setNotes} = useContext(authContext)


  useEffect(() => {
    axios.post("http://localhost:8090/api/users/get", {"_id" : currentuser})
    .then((res)=>setNotes(res.data))
    .catch((err)=>console.log(err))
  }
  , [])
  

  return (<div className={styles.container}>
    <div className={styles.leftbar}><SwipeableTemporaryDrawer notes={notes}/></div>
    <div className={styles.rightbar}><Right/></div>
    </div>
  )
}
