import React, { useState } from 'react';
import './SignUpPage.css'
import { Link } from 'react-router';
import Utilities from '../Utilities/Utilities';


export default function SignUpPage(props) {
  const Utility = new Utilities();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signupUser, setsignupUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email_id: "",
    passkey: "",
    isNewEmailUser: true
  })

  const onCancelClick = () => {
    props.onCancelClick();
  }

  const onInputChange = (e) => {
    let key = e.target.name;
    let val = e.target.value;
    if (key === "email_id" && val !== "") {
      // setsignupUser({ ...signupUser, isNewEmailUser: true });
      if (val.split("@").length === 2 && val.split("@")[0] !== "" && val.split("@")[1].split(".").length === 2 && val.split("@")[1].split(".")[1] !== "") {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false)
      }
    } else if (key === "email_id" && val === "") {
      // setsignupUser({ ...signupUser, isNewEmailUser: true });
      setIsValidEmail(true)
    }
    setsignupUser({
      ...signupUser,
      [key]: val,
      isNewEmailUser: true
    });
  }

  const onEmailFocusOut = (e) => {
    let val = e.target.value;
    if (val.split("@").length === 2 && val.split("@")[0] !== "" && val.split("@")[1].split(".").length === 2 && val.split("@")[1].split(".")[1] !== "") {
      Utility.getUser(`/api/signupcheck?email_id=${val}`, (data) => {
        if (data.status === 'successful') {
          setsignupUser({ ...signupUser, isNewEmailUser: false });
        } else {
          setsignupUser({ ...signupUser, isNewEmailUser: true });
        }
      });
    }
  }

  const onSignupClick = (e) => {
    // alert("hi");
    e.preventDefault();
    let approveSignUp = true;
    for(let key in signupUser){
      if(key !== "isNewEmailUser"){
        if(signupUser[key] === "" || signupUser[key] === null || signupUser[key] === undefined){
          approveSignUp = false;
          break;
        }
      }
    }

    if(approveSignUp && isValidEmail) {
      Utility.addUser(signupUser, (data) => {
        if(data.status === "successful"){
          setSignUpSuccess(true);
          setTimeout(() => {
            setSignUpSuccess(false);
            window.location.href = window.location.origin + `/login`;
          }, [5000]);
        }
      });
    } else {
      alert("Please enter all the fields");
      return;
    }
  }

  return (
    <>
      {!signUpSuccess ?
        <div className="all-center-section">
          <div className="all-center-container">
            <h2>Sign Up</h2>
            <div className="row my-2">
              <div className="login-box col mx-2">
                <input id="firstName" type="text" name='first_name' value={signupUser.first_name} onChange={onInputChange} placeholder="First Name" required />
              </div>
              <div className="login-box col mx-2">
                <input id="lastName" type="text" name='last_name' value={signupUser.last_name} onChange={onInputChange} placeholder="Last Name" required />
              </div>
            </div>
            <div className="row my-2">
              <div className="login-box col mx-2">
                <input id="userName" type="text" name='username' value={signupUser.username} onChange={onInputChange} placeholder="Username" required />
              </div>
              <div className="login-box col mx-2">
                <input id="emailId" type="email" name='email_id' value={signupUser.email_id} onChange={onInputChange} placeholder="Email Id" required onBlur={onEmailFocusOut} />
                {!isValidEmail &&
                  <div style={{ marginTop: "-5px", marginBottom: "-5px" }} className='col mx-2'>
                    <small style={{ color: "red", fontSize: "12px" }}>Enter valid email</small>
                  </div>
                }
                {!signupUser.isNewEmailUser &&
                  <div style={{ marginTop: "-5px", marginBottom: "-5px" }} className='col mx-2'>
                    <small style={{ color: "red", fontSize: "12px" }}>Email already present</small>
                  </div>
                }
              </div>
            </div>
            <div className="row my-2">
              <div className="login-box col mx-2">
                <input id="password" type="password" name='passkey' value={signupUser.passkey} onChange={onInputChange} placeholder="Password" required />
              </div>
            </div>
            <div className="login-box my-2 py-2 pb-3">
              <Link className={"btn-login me-2".concat(!signupUser.isNewEmailUser ? " disable-signup" : "")} onClick={onSignupClick}>SignUp</Link>
              or
              <Link to="/" className="btn-login ms-2" onClick={onCancelClick}>Cancel</Link>
            </div>
          </div>
        </div>
        :
        <div className="signup-section">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/017/110/950/original/green-check-mark-icon-animation-animated-check-mark-on-white-background-free-video.jpg"
            alt="sign-up successful" className={"circle-img"} />
          <p style={{ marginTop: "25px" }}>Sign successful ✅</p>
        </div>
      }
    </>
  );
}
