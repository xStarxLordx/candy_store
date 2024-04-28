import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Icon from "react-bootstrap-icons";
import logo from "../Images/candyShopLogo2.png"
import SignUp from '../components/SignUp';


function Sidebar() {
  const signOut = () =>{
        window.localStorage.clear()  
        
    }

  return (

    <div className=" sidebar">
      <div className="m-2">
        <img src={logo} className="logo1 mx-2"></img>
       {/*  <p className=" fw-bold text-center " style={{fontSize:20}}>Candy Shop</p> */}
        </div>
        <hr className='text-dark'/>
        <div className='list-group list-group-flush align-content-around'>
          <a className='list-group-item list-group-item-action my-5 text-center bg-transparent' href='/storage'>
            <Icon.DatabaseFillGear size={40} className=''/>
            <p>Dashboard</p>
          </a>
          <a className='list-group-item list-group-item-action my-5 text-center bg-transparent' href='/inventory'>
            <Icon.BoxFill size={40} className=''/>
            <p>Inventory</p>
          </a>
          {/* <a className='list-group-item list-group-item-action my-5 text-center bg-transparent' href='/'>
            <Icon.PersonFillUp size={40} className=''/>
            <p>Sign In</p>
          </a> */}
          <a className='list-group-item list-group-item-action my-5 text-center bg-transparent' href='/signup'>
            <Icon.PersonFillAdd size={40} className='' />
            <p>Sign Up</p>
          </a>
          <a className='list-group-item list-group-item-action my-5 text-center bg-transparent' onClick={signOut} href='/'>
            <Icon.PersonFillX size={40} className=''/>
            <p>Sign Out</p>
          </a>
          <a className=' list-group-item-action my-5 text-center bg-transparent' onClick={signOut} href='/'>
            
          </a>
          <a className=' list-group-item-action my-5 text-center bg-transparent' onClick={signOut} href='/'>
            
          </a>
          <a className=' list-group-item-action my-5 text-center bg-transparent' style={{height:"26px"}} onClick={signOut} href='/'>
            
          </a>
          
        </div>
    </div>

  )
}

export default Sidebar