import React from 'react'
// import  {Left } from './components/Left'
import SwipeableTemporaryDrawer from './components/Left'
import styles from "./index.module.css"

export const Application= () => {
  return (<div className={styles.container}>
    <div className={styles.leftbar}><SwipeableTemporaryDrawer/></div>
    <div className={styles.rightbar}>Right</div>
    </div>
  )
}
