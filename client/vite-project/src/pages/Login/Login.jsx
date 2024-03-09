import React, { useState, useContext } from "react";
import Axios from "axios";
import "./login.scss";
import { Navigate, useNavigate } from "react-router-dom";
function Login() {
  const Navigate = useNavigate();

  const [userLogin, setUserLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorlogin, setErrorLogin] = useState("");
  //username after the user logs in
  const [username, setUsername] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:3001/login", {
        userLogin: userLogin,
        passwordLogin: passwordLogin,
      });
      const data = response.data;
      console.log(data.username);
      Navigate(`/home/${data.username}`);
    } catch (err) {
      if (err.response) {
        setErrorLogin(err.response.data.message);
      } else {
        setErrorLogin(
          "An error has occured, check your login information or try again later"
        );
      }
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
