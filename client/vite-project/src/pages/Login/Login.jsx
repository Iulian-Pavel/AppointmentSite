import React, { useState } from 'react';
import './login.scss';

function Login() {

    const [userLogin, setUserLogin] = useState("");
    const [passwordlogin, setPasswordLogin] = useState("");
    const [errorlogin, setErrorLogin] = useState("");

  return (
    <>
        <input type="text" placeholder="username" name="username_login" id="username_login" />
        <input type="password" placeholder="password" name="password_login" id="password_login" />
        <button>Login</button>
    </>
  )
}

export default Login