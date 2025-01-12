import React, { useEffect, useState } from 'react';
import './TopNav.css';
import { NavLink } from 'react-router';

export default function TopNav(props) {
    const [showLoginBtn, setshowLoginBtn] = useState(true);

    const clickShowLoginPage = () => {
        setshowLoginBtn(false);
    }

    useEffect(() => {    
      if(window.location.pathname.split('/')[1] === 'login' || window.location.pathname.split('/')[1] === 'signup' || window.location.pathname.split('/')[1] === 'todos'){
        setshowLoginBtn(false);
      } else {
        setshowLoginBtn(true);
      }
    }, [props.pathName])
    

  return (
    <nav className="navbar navbar-expand-lg px-5">
        <a className="navbar-brand" href="/">To-Dos</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        { showLoginBtn && <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="btn-login nav-link" to="/login" onClick={clickShowLoginPage}>Login</NavLink>
                </li>
            </ul>
        </div>}
        { false && <div className="collapse navbar-collapse" id="navbarNav-profile">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" role="button" id='navbarDropdown'
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <a style={{textDecoration: 'none'}}>Bibhu Prasad!</a>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/">Action</a>
                        <a className="dropdown-item" href="/">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/">Something else here</a>
                    </div>
                </li>
                <li className="nav-item">
                    {/* <img className="nav-link" src='../' /> */}
                    <img className='' src="../assets/user-profile.png" alt="" />
                </li>
            </ul>
        </div>}
    </nav>
  )
}
