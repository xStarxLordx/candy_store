import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/styles.css";
import logo from "../Images/candyShopLogo2.png";
import bgImage from "../Images/candyStore1.jpg";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { alerts } from '../alert';
import { Button,Modal,Input } from 'react-bootstrap';
import axios from "axios";



function SignUp() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSignUp = (e) => {
    console.log(name, email, password);
    e.preventDefault();
    try{
        fetch("http://localhost:4000/api/users/SignUp", {
            method: "POST",
            crossDomain: true,
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
            userName:name,
            email:email,
            password:password,
            }),
            
        }).then((res) => res.json())
        .then((data) => {
            console.log(data.status, "registerUser");
            if (data.status === "ok") {
                alert("Successfully signed up")
                window.location.href = "/"
            }
            else if(data.status === "Email already exists" ){
                alerts("This email is being use by another user.", "warning")
            } else {
                alerts("Something went wrong","error");
            }
        });
    } catch(error){
        console.log(error)
    }
    /* axios.post('http://localhost:4000/api/users/SignUp', {
        userName: name,    
        email:email,
        password:password,
    })
    .then((response) => {
        console.log(response.json)
        console.log(response)
        console.log(response.statusText)
        if(response.status === 200){
        alert("Registration Successful");
        console.log(response);
        window.location.href = "/SignIn"
        }   else if(response.status === "Email already exists" ){
            alert(response.status)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
         */
            
            
    
}


    return (
        <div className="wrapper align-content-center justify-content-center">
        <img className="bgImage" src={bgImage}></img>
        <div className="align-content-center justify-content-center">
            <img src={logo} className="logo "></img>
            <div className="login ">
            <h2 className="mb-3">Sign Up</h2>
            <form className="needs-validation" onSubmit={handleSignUp}>
                <div className="form-group mb-2 was-validated">
                <label htmlFor="email" className="form-label">
                    {" "}
                    Name{" "}
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name..."
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="invalid-feedback">Please enter your name</div>
                </div>
                <div className="form-group mb-2 was-validated">
                <label htmlFor="email" className="form-label">
                    {" "}
                    Email Address{" "}
                </label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
                <div className="invalid-feedback">Please enter a valid email</div>
                </div>
                <div className="form-group mb-2 was-validated">
                <label htmlFor="password" className="form-label">
                    {" "}
                    Password{" "}
                </label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Pasword..."
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="invalid-feedback">Please enter the password</div>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-success w-100 mt-2"
                >
                    {" "}
                    Sign Up

                </button>
                <p className="link">
                Already registered <a href="/">Sign In</a>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
}

export default SignUp;
