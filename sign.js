import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sign.css";

import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import axios from "axios";

function Login() {
  const [user, setUser] = useState(); //this one for the username
  const [pass, setPass] = useState();
  const [errorMessage, setErrorMessage] = useState(""); //this is one is used to  send  error message
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && pass) {
      const userData = { username: user, password: pass };
      console.log(userData);
      try {
        const response = await axios.post(
          "http://localhost:3002/api/register",
          userData
        );
        console.log("Reponse", response.data);
        setUser("");
        setPass("");
        setErrorMessage("");
        alert("Registration successful");

        navigate("/");
      } catch (error) {
        console.log("error", error);
        if (error.response.status === 409) {
          setErrorMessage("User already exists  use the differnt username");
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      }
    } else {
      setErrorMessage("please fill  the requied filled");
    }
  };
  return (
    <div className="sign">
      <div className="container">
        <form className="for" onSubmit={handleSubmit}>
          {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
          <h1 style={{ color: "white", textAlign: "center" }}>Signin Here</h1>

          <label htmlFor="username">Username</label>
          <br></br>
          <Input
            placeholder="Enter your username"
            prefix={<UserOutlined />}
            id="username"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <br></br>
          <Input.Password
            placeholder=" password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            id="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button type="submit">Sign In</button>

          <br></br>
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
    </div>
  );
}

export default Login;
