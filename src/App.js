import { useEffect, useState } from "react";
import './App.css';
import LoginPage from "./Components/loginPage/LoginPage.jsx";
import TopNav from "./Components/TopNav/TopNav.jsx";
import Home from "./Components/Home/Home.jsx";
import ToDos from "./Components/ToDos/ToDos.jsx";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import SignUpPage from "./Components/signupPage/SignUpPage.jsx";

function App() {
  // let loginSignUpPath = '';
  const [currentPage, setCurrentPage] = useState({
    loginPage: false,
    vistorPage: false,
    loginSignUpPath: '',
    toggle: true
  });

  // React Routers to be implemented
  useEffect(() => {
    setCurrentPage({
      loginSignUpPath: window.location.pathname !== "/" ? window.location.pathname.split('/')[1] : ''
    })
    console.log(`login path: ${currentPage.loginSignUpPath}`);
  }, [currentPage.toggle]);

  const onCancelClick = () => {
    setCurrentPage({
      toggle: !currentPage.toggle
    });
  }


  return (
    <>
      <BrowserRouter>
        {/* Landing Page */}
        <TopNav pathName={currentPage.loginSignUpPath} />
        <Routes path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage onCancelClick={onCancelClick} />} />
          {/* TODos page */}
          <Route path="/todos" element={<ToDos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <>
      <Outlet />  {/* Where nested routes will render */}
    </>
  );
}

export default App;
