import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  const handleOnClick = () => {
    const loginRequest = {
      username: username,
      password: password,
    };

    api
      .post("/user/login", loginRequest)
      .then((res) => {
        const { jwt, user } = res.data;
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        setAlert("Login successfully");
        const decodedToken = jwtDecode(jwt) as { isAdmin: boolean };
        if (decodedToken.isAdmin) {
          navigate("/admin/book");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        setAlert("Login Failed");
      });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button
            onClick={handleOnClick}
            type="button"
            className="btn btn-primary"
          >
            Login
          </button>
        </div>

        <div className="mt-3 text-center">
          <small className="text-muted">
            Dont have account yet ? <NavLink to={"/register"}>Register</NavLink>
          </small>
        </div>
        {alert && <div style={{ color: "red" }}>{alert}</div>}
      </div>
    </div>
  );
};

export default Login;
