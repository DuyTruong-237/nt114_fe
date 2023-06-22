import "./ForgotPassword.css"
import React from 'react'
import mainlogo from '../../img/mainlogo.png'
export default function ForgotPassword() {
    return(
        <div className="Forgot_Wrapper">
            <div className="ForgotPass-header">
                <center>
                    <img 
                    className="Forgot-Logo"
                    src= {mainlogo} alt="Logo" />
                    <h1 className="Name-Logo">
                        HOGWART
                    </h1>
                </center>
            </div>
            
            <div className="ForgotPass-content">
                <div className="ForgotPage">
                    <h2 className="Text">
                        Forgot your password?
                    </h2>
                    <h3 className="Slogan">
                        Please enter the email you use to sign in to....
                    </h3>
                </div>

                <div className="Form">

                    <div className="Page">Email</div>
                    <input type="text" className="Email_details" placeholder="mail" />
                    <button className="buttonSend"><b>SEND</b></button>
                    <div className="message">Back to sign in</div>

                </div>

            </div> 

            
        </div>
       


    )

}