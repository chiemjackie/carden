import React, { useState, useContext } from "react";
import styled from "styled-components";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import { CurrentUserContext } from "../CurrentUserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [loginFailed, setLoginFailed] = useState(null);
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

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

    let loginEmailInput = document.getElementById("loginEmail").value;
    let loginPasswordInput = document.getElementById("loginPassword").value;

    const verifyUser = (allUsers) => {
      console.log(allUsers);
      allUsers.forEach((user) => {
        if (
          loginEmailInput === user.email &&
          loginPasswordInput === user.password
        ) {
          setCurrentUser(user);
          history.push("/play");
        }
      });
      if (currentUser === null) {
        setLoginFailed(true);
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
          <label htmlFor="loginEmail">Email:</label>
          <input
            id="loginEmail"
            name="loginEmail"
            type="email"
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
      {loginFailed && (
        <RejectedLogin>
          <HiX />
          <p>Incorrect email or password - please try again.</p>
        </RejectedLogin>
      )}
    </div>
  );
};

const RejectedLogin = styled.div`
  display: flex;
`;

export default Login;
