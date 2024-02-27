import React, { useState } from "react";
import Axios from 'axios';
import "./login.scss";

function Login() {
  const [userLogin, setUserLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorlogin, setErrorLogin] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/login", {
        userLogin: userLogin,
        passwordLogin: passwordLogin
      });
    } catch(err) {
      if(err.response) {
        setErrorLogin(err.response.data.message);
      }
      setErrorLogin("An error has occured, check your login information or try again later");
    }
  };

  return (
    <>
    <p>{errorlogin}</p>
      <input
        type="text"
        placeholder="username"
        name="userLogin"
        id="userLogin"
        onChange={(e) => setUserLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        name="password_login"
        id="password_login"
        onChange={(e) => setPasswordLogin(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
    </>
  );
}

export default Login;
