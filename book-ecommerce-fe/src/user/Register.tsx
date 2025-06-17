import React, { useState } from "react";
import api from "../api/api";

const Register = () => {
  const [username, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [sex, setSex] = useState<boolean>(false);
  const [errorUserName, setErrorUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorRepeatedPassword, setErrorRepeatedPassword] =
    useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const isUserNameExits = async (username: string) => {
    try {
      const res = await api.get(
        `users/search/existsByUserName?username=${username}`
      );

      const data = res.data;
      if (data === true) {
        setErrorUserName("Username is existed");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const isEmailExits = async (email: string) => {
    try {
      const res = await api.get(`users/search/existsByEmail?email=${email}`);

      const data = res.data;
      if (data === true) {
        setErrorEmail("Email is existed");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const isPasswordValid = (password: string) => {
    const regex = /^(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;
    const result = regex.test(password);
    if (result === false) {
      setErrorPassword("Please add at least 8 chars and  one word !@#$%^&*");
      return false;
    }
    return true;
  };
  const isRepeatedPasswordValid = (repeatedPassword: string) => {
    if (password !== repeatedPassword) {
      setErrorRepeatedPassword("Password is not repeated correctly");
      return false;
    }
    return true;
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorEmail("");
    isEmailExits(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorPassword("");
    isPasswordValid(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setErrorUserName("");
    isUserNameExits(e.target.value);
  };
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleRepeatedPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedPassword(e.target.value);
    setErrorRepeatedPassword("");
    isRepeatedPasswordValid(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isUserNameValid = !(await isUserNameExits(username));
    const isEmailValid = !(await isEmailExits(email));
    const isPasswordOk = isPasswordValid(password);
    const isRepeatedPasswordOK = isRepeatedPasswordValid(repeatedPassword);

    if (
      isUserNameValid &&
      isEmailValid &&
      isPasswordOk &&
      isRepeatedPasswordOK
    ) {
      try {
        const response = await api.post("/user/register", {
          userName: username,
          firstName,
          lastName,
          sex,
          password,
          address,
          email,
          activeCode: "",
          active: false,
        });
        if (response.status === 200 || response.status === 201) {
          setAlert("Success, please check email");
        } else {
          setAlert("Unexpected status: " + response.status);
        }
      } catch (error) {
        setAlert("Error");
        console.log(error);
      }
    }
  };
  return (
    <div className="container">
      <h1 className="mt-5 text-center">Register</h1>
      <div className="mb-3 col-md-6 col-12 mx-auto">
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              onChange={handleUserNameChange}
              type="text"
              id="username"
              value={username}
              className="form-control"
            />
            <div style={{ color: "red" }}>{errorUserName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={handleEmailChange}
              type="text"
              id="email"
              value={email}
              className="form-control"
            />
            <div style={{ color: "red" }}>{errorEmail}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              onChange={handleFirstNameChange}
              type="text"
              id="firstname"
              value={firstName}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              onChange={handleLastNameChange}
              type="text"
              id="lastname"
              value={lastName}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              value={password}
              className="form-control"
            />
            <div style={{ color: "red" }}>{errorPassword}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="repeatedpassword" className="form-label">
              Repeated Password
            </label>
            <input
              onChange={handleRepeatedPasswordChange}
              type="password"
              id="repeatedpassword"
              value={repeatedPassword}
              className="form-control"
            />
            <div style={{ color: "red" }}>{errorRepeatedPassword}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              onChange={handleAddressChange}
              type="text"
              id="address"
              value={address}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sex</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  id="male"
                  value="true"
                  checked={sex === true}
                  onChange={() => setSex(true)}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  id="female"
                  value="false"
                  checked={sex === false}
                  onChange={() => setSex(false)}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div style={{ color: "green" }}>{alert}</div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
