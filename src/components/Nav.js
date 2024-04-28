import React from 'react'
import * as Icon from "react-bootstrap-icons";
import "bootstrap/js/dist/dropdown"

function Nav({Toggle, userName}) {
    

    return(
        <nav
            className="navbar navbar-expand-sm navbar-white bg-transparent px-3"
        >
            <Icon.List className=" navbar-brand text-white "  size={60} onClick={Toggle}/>
            
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link text-white jus"
                            style={{fontSize:"24px"}}
                            id="dropdownId"
                            href='#userDropDown'
                            data-toggle="collapse"
                            data-bs-toggle="dropdown"
                            aria-controls="userDropDown"
                            aria-expanded="false"
                            > 
                            {userName}
                            <Icon.PersonCircle className=" navbar-brand text-white "  size={50}/>  
                            
                            
                        </a>
                        <div className=" dropdown-menu " aria-labelledby="dropdownId">
                            <a className="dropdown-item" href="#">Profile</a>
                            <a className="dropdown-item" href="#">Settings</a>
                            <a className="dropdown-item" href="#">Sign Out</a>
                        </div>
                        
                    </li>
                </ul>
                
        
        </nav>
    )
}

export default Nav