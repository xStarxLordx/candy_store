import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/styles.css";
import logo from "../Images/candyShopLogo2.png";
import bgImage from "../Images/candyStore1.jpg";
import axios from 'axios';
import { alerts } from "../alert";




function SignIn() {
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");


const handleSignIn = (e) => {
    console.log(email, password);
    e.preventDefault();
    
    try{
        fetch("http://localhost:4000/api/users/SignIn", {
            method: "POST",
            crossDomain: true,
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json", 
            "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
            email:email,
            password:password,
            }),
            
        }).then( (res) => res.json())
        .then((data) => {
            if (data.status === "ok") {
                console.log(data, "Sign In");
                window.localStorage.setItem("token", data.data)
                window.localStorage.setItem("signedIn", true)
                window.location.href = "/storage"
                

            }
            else if(data.status === "Email already exists" ){
                alert(data.status)
            } else {
                alert("Something went wrong");
            }
        });
    } catch(error){
        console.log(error)
    }/* 
    axios.post('http://localhost:4000/api/users/SignIn', {
        email:email,
        password:password,
    })
    .then(function (response) {
        console.log(response.status)
        if(response.status === 201){
        console.log(response);
        window.location.href = "/storage"}
    })
    .catch(function (error) {
        console.log(error);
    }); */
        
}


    return (
        <div className="wrapper align-content-center justify-content-center">
        <img className="bgImage" src={bgImage}></img>
        <div className="align-content-center justify-content-center">
            <img src={logo} className="logo "></img>
            <div className="login ">
            <h2 className="mb-3">Login</h2>
            <form className="needs-validation" onSubmit={handleSignIn}>
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
                ></input>
                <div className="invalid-feedback">Please enter the password</div>
                </div>
                <div className="form-group mb-2">
                <input type="checkbox" className="form-check-input"></input>
                <label htmlFor="check" className="form-check-label">
                    {" "}
                    Remember me{" "}
                </label>
                </div>
                <button type="submit" className="btn btn-success w-100 mt-2">
                {" "}
                Sign In
                </button>
                <p className="link">
                Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
}

export default SignIn;
