import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'
import styles from './auth.module.css'


export default function Auth() {
  return (
    <main className={styles.authWrapper}>
      <div className={styles.sideWrapper}>
          <img src='/vacation-auth.png' className={styles.sideImg}/>
        <div className={styles.logoWrapper}>
          <img src='/vacationsTitle.png' className={styles.titleImg}/>
        </div>
      </div>
      <Outlet />
    </main>
  )
}
