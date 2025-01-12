import React, { useEffect, useState } from "react";
import '../common.css';
import './loginPage.css';
import { Link } from "react-router";
import Utilities from "../Utilities/Utilities";
import { ToastContainer, toast } from "react-toastify";

function LoginPage(props) {
    const Utility =  new Utilities();
    const [signUpPageShown, setsignUpPageShown] = useState(false);
    
    const [userlogin, setUserlogin] = useState({
        email_id: "",
        passkey: ""
    });

    const showSignUpPage = () => {
        setsignUpPageShown(true);
        // props.onSignupClick();
    };

    const onLogin = () => {
        Utility.getUser(`/api/login?email_id=${userlogin.email_id}&passkey=${userlogin.passkey}`, (data) => {
            // alert(data.status);
            if(data.status === "successful"){
                toast.success("Login successful");
            } else if(data.status === "invalid") {
                toast.warning("Invalid credentials! Please check and try again!");
            } else {
                toast.error("Login issue! Please try again after some time.");
            }
        });
    }

    useEffect(() => {
        
    }, [])
    

    return (
        <div className="all-center-section">
            <ToastContainer />
            <div className="all-center-container">
                <h2>Login</h2>
                <div className="login-box">
                    <input id="emailId" type="email" placeholder="Email" 
                        value={userlogin.email_id} 
                        required
                        onChange={(e)=> { setUserlogin({ ...userlogin, email_id: e.target.value }) }}
                    />
                </div>
                <div className="login-box">
                    <input id="password" type="password" placeholder="Password" 
                        value={userlogin.passkey}
                        required
                        onChange={(e)=> { setUserlogin({ ...userlogin, passkey: e.target.value }) }}
                    />
                </div>
                <div className="login-box py-2 pb-3">
                    <Link className="btn-login me-2" onClick={onLogin}>Login</Link>
                     or 
                    <Link to="/signup" className="btn-login ms-2" onClick={showSignUpPage}>Sign-Up</Link>
                    
                </div>
            </div>
        </div>
    );
}

export default LoginPage;