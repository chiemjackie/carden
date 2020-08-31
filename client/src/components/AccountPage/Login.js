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
    <LoginWrapper>
      <LoginTitle>Login</LoginTitle>
      <LoginForm onSubmit={login}>
        <EmailWrapper>
          <LoginLabel htmlFor="loginEmail">Email:</LoginLabel>
          <LoginInput
            id="loginEmail"
            name="loginEmail"
            type="email"
            placeholder="jane.doe@email.com"
            required
          ></LoginInput>
        </EmailWrapper>
        <PasswordWrapper>
          {passwordType === "password" && (
            <ShowPasswordButton onClick={toggleShowPassword}>
              <BsEyeFill />
            </ShowPasswordButton>
          )}
          {passwordType === "text" && (
            <ShowPasswordButton onClick={toggleShowPassword}>
              <BsEyeSlashFill />
            </ShowPasswordButton>
          )}
          <LoginLabel htmlFor="loginPassword">Password:</LoginLabel>
          <LoginInput
            id="loginPassword"
            name="loginPassword"
            type={passwordType}
            placeholder="********"
            required
          ></LoginInput>
        </PasswordWrapper>
        <SubmitButton type="submit" value="Login"></SubmitButton>
      </LoginForm>
      {loginFailed && (
        <LoginInfoWrapper>
          <StyledX />
          <LoginInfoText>
            Incorrect email or password - please try again.
          </LoginInfoText>
        </LoginInfoWrapper>
      )}
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginTitle = styled.h2`
  margin-bottom: 1vh;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: right;
  padding-right: 16px;
`;
const EmailWrapper = styled.div``;

const PasswordWrapper = styled.div``;

const LoginLabel = styled.label`
  margin-right: 1vw;
`;
const LoginInput = styled.input`
  width: 150px;
  margin-top: 1vh;
`;

const ShowPasswordButton = styled.button`
  margin-left: 12px;
  border: none;
  background-color: transparent;
  outline: none;
`;

const SubmitButton = styled.input`
  margin-top: 2vh;
  width: 94%;
  margin-left: 16px;
`;

const LoginInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledX = styled(HiX)`
  color: red;
  font-size: 1.6rem;
`;

const LoginInfoText = styled.p`
  margin: 1vh 0 1vh 8px;
`;

export default Login;
