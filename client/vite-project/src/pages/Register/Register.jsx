import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import "./register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUsers = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/insert", {username: username, email: email, password: password});
  }

  return (
    <>
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={registerUsers}>Register</button>
    </>
  );
}

export default Register;
