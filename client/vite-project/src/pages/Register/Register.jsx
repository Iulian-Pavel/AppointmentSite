import React, { useState } from "react";
import Axios from "axios";
import "./register.scss";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle, MdEmail } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerUsers = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/insert", {
        username: username,
        email: email,
        password: password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      console.log(err);
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("An error occured, please try again later");
      }
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-right">
          <p>{error}</p>
          <h1>Creare cont</h1>
          <MdOutlineAccountCircle  style={{scale: '1.2'}}/>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nume"
            onChange={(e) => setUsername(e.target.value)}
          />
          <GiPadlock style={{scale: '1.2'}}/>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Parola"
            onChange={(e) => setPassword(e.target.value)}
          />
          <MdEmail style={{scale: '1.2'}}/>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={registerUsers}>Inregistrare</button>
          <p>Sau</p>
          <Link to="login">Logati-va</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
