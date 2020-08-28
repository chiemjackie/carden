import React, { useState } from "react";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");

  const toggleShowPassword = (event) => {
    event.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const login = (event) => {
    event.preventDefault();

    let loginUsernameInput = document.getElementById("loginUsername").value;
    let loginPasswordInput = document.getElementById("loginPassword").value;

    const verifyUser = (allUsers) => {
      for (let i = 0; i < allUsers.length; i++) {
        if (
          loginUsernameInput === allUsers[i].username &&
          loginPasswordInput === allUsers[i].password
        ) {
          console.log("match found");
        }
      }
    };

    fetch("/account/login", {})
      .then((res) => res.json())
      .then((users) => verifyUser(users.data));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <label htmlFor="loginUsername">Username:</label>
          <input
            id="loginUsername"
            name="loginUsername"
            type="text"
            placeholder=""
            required
          ></input>
        </div>
        <div>
          <label htmlFor="loginPassword">Password:</label>
          <input
            id="loginPassword"
            name="loginPassword"
            type={passwordType}
            placeholder=""
            required
          ></input>
          {passwordType === "password" && (
            <button onClick={toggleShowPassword}>
              <BsEyeFill />
            </button>
          )}
          {passwordType === "text" && (
            <button onClick={toggleShowPassword}>
              <BsEyeSlashFill />
            </button>
          )}
        </div>
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
};

export default Login;
