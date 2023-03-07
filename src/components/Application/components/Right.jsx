import React from 'react'
import MyEditor from './MyEditor'
import styles from "./Right.module.css"

const Right = () => {
  return (<>
    <div className={styles.container}><MyEditor/></div>
    </>
  )
}

export default Right