import React, { useState, useContext } from "react";
import Axios from "axios";
import "./login.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";

function Login() {
  const Navigate = useNavigate();

  const [userLogin, setUserLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorlogin, setErrorLogin] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:3001/login", {
        userLogin: userLogin,
        passwordLogin: passwordLogin,
      });
      const data = response.data;
      console.log(data.error);
      console.log(data.username);
      Navigate(`/home/${data.username}`);
    } catch (err) {
      if (err.response) {
        setErrorLogin(err.response.data.error);
      } else {
        setErrorLogin(
          "An error has occured, check your login information or try again later"
        );
      }
    }
  };

  return (
    <>
    <div className="login">
      <h1>Logare</h1>
      <p>{errorlogin}</p>
      <MdOutlineAccountCircle />
      <input
        type="text"
        placeholder="Username"
        name="userLogin"
        id="userLogin"
        className="user_login"
        onChange={(e) => setUserLogin(e.target.value)}
      />
      <GiPadlock />
      <input
        type="password"
        placeholder="Password"
        name="password_login"
        id="password_login"
        className="password_login"
        onChange={(e) => setPasswordLogin(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
      </div>
    </>
  );
}

export default Login;
