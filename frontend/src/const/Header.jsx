import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'

export default function Header() {

  return (
    <header id='header'>
        
        <Link to={'/'}>
            <img className='canClick' src={require('../resources/icon _burger.png')}  alt="IMG" />
        </Link>
        <div className="menu-buttons">
            <ul> 
                <Link to={'/'}>HOME</Link>
                <Link to={'/nearme'}>NEAR ME</Link>
                <Link to={'/about'}>ABOUT US</Link>
            </ul>
        </div>
        <div className="shoping-buttons">
            <ul>
                <i onClick={() => console.log("Clicked Shop")} className="fa-solid fa-basket-shopping"></i>
            </ul>
        </div>
        <div className="login-form">
            <ul>
                <a href="#">
                    LOGIN
                </a>
                <a id='register' href="#">REGISTER</a>
            </ul>
        </div>

    </header>
  )
}
