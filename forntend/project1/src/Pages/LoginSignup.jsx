import React from "react";
import './CSS/Loginsignup.css';
const LoginSignUp=()=>{
 return(
    <div className="loginsignup">
        <div className="login-container">
         <h1>Sign Up</h1>
         <div className="loginsignup-field">
           <input type="text" placeholder="Your Name"/><br/>
           <input type="email" placeholder="Email Address"/><br/>
           <input type="password" placeholder="Password"/>
         </div>
         <button>Continue</button>
         <p className="login">
            Already have an account? 
            <span> Login here</span>
         </p>
         <div className="login-agree">
            <input type="checkbox" name="" id=""/>
            <p>By Continue, I agree to the terms of use & privacy policy </p>
         </div>
    
        </div>
    </div>
 )


}

export default LoginSignUp;