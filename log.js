import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd"; // Import useState hook
import "./styles.css"; // Import CSS file

import { Link } from "react-router-dom";
import axios from "axios";

function LoginForm({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      const userData = { username, password };
      try {
        const reponse = await axios.post(
          "http://localhost:3002/api/login",
          userData
        );

        // reponse.data.userId;
        const userId = reponse.data.userId;
        setCurrentUser(userId);
        console.log(setCurrentUser.username);

        localStorage.setItem("userId", userId);
        navigate("/home");
        console.log(userId);

        console.log(reponse.data.userId);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setErrorMessage("username and  password is wrong");
        } else {
          setErrorMessage("invalid opertion");
        }
      }
    } else {
      setErrorMessage("please provide the username and password");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
        )}
        <h3>Login Here</h3>
        <label htmlFor="username">Username</label>
        <br></br>
        <Input
          placeholder="Enter your username"
          prefix={<UserOutlined />}
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <br></br>
        <Input.Password
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <br></br>
        <p>If don't have account</p>

        <a href="sign">SignUp Here </a>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
