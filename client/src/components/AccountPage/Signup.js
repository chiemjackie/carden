import React, { useState } from "react";
import styled from "styled-components";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { HiX, HiCheck } from "react-icons/hi";
import { COLORS } from "../../constants";

const Signup = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [emailTaken, setEmailTaken] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [nameContainsGuest, setNameContainsGuest] = useState(false);
  const [readyForLogin, setReadyForLogin] = useState(false);

  const toggleShowPassword = (event) => {
    event.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const register = (event) => {
    event.preventDefault();
    let fnameInput = document.getElementById("fname").value;
    let lnameInput = document.getElementById("lname").value;
    let emailInput = document.getElementById("email").value;
    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    if (usernameInput.slice(0, 5) === "guest") {
      setNameContainsGuest(true);
    } else {
      const checkIfDuplicate = (allUsers) => {
        let emailTakenFlag = false;
        let usernameTakenFlag = false;

        for (let i = 0; i < allUsers.length; i++) {
          if (emailInput === allUsers[i].email) {
            emailTakenFlag = true;
          } else if (allUsers && usernameInput === allUsers[i].username) {
            usernameTakenFlag = true;
          }
        }

        if (emailTakenFlag) {
          setEmailTaken(true);
        } else if (usernameTakenFlag) {
          setEmailTaken(false);
          setUsernameTaken(true);
        } else if (!emailTakenFlag && !usernameTakenFlag) {
          setEmailTaken(false);
          setUsernameTaken(false);
          createUser();
          setReadyForLogin(true);
        }
      };

      fetch("/account/login", {})
        .then((res) => res.json())
        .then((users) => checkIfDuplicate(users.data));

      const createUser = () =>
        fetch("/account/signup", {
          method: `post`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname: fnameInput,
            lname: lnameInput,
            email: emailInput,
            username: usernameInput,
            password: passwordInput,
            sunflowers: 1000,
            roses: 0,
          }),
        });
    }
    event.target.reset();
  };

  return (
    <SignupWrapper>
      <SignupTitle>Register for an account</SignupTitle>
      <SignupForm onSubmit={register}>
        <FNameWrapper>
          <RegistrationLabel htmlFor="fname">First name:</RegistrationLabel>
          <RegistrationInput
            id="fname"
            name="fname"
            type="text"
            placeholder="Jane"
            required
          ></RegistrationInput>
        </FNameWrapper>
        <LNameWrapper>
          <RegistrationLabel htmlFor="lname">Last name:</RegistrationLabel>
          <RegistrationInput
            id="lname"
            name="lname"
            type="text"
            placeholder="Doe"
            required
          ></RegistrationInput>
        </LNameWrapper>
        <EmailWrapper>
          <RegistrationLabel htmlFor="email">Email:</RegistrationLabel>
          <RegistrationInput
            id="email"
            name="email"
            type="email"
            placeholder="jane.doe@email.com"
            required
          ></RegistrationInput>
        </EmailWrapper>
        <UsernameWrapper>
          <RegistrationLabel htmlFor="username">Username:</RegistrationLabel>
          <RegistrationInput
            id="username"
            name="username"
            type="text"
            placeholder="janedoe123"
            minlength="5"
            maxlength="13"
            required
          ></RegistrationInput>
        </UsernameWrapper>
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
          <RegistrationLabel htmlFor="password">Password:</RegistrationLabel>
          <RegistrationInput
            id="password"
            name="password"
            type={passwordType}
            placeholder="********"
            minlength="5"
            maxlength="20"
            required
          ></RegistrationInput>
        </PasswordWrapper>
        <SubmitButton type="submit" value="Register"></SubmitButton>
      </SignupForm>
      {emailTaken && (
        <SignupInfoWrapper>
          <StyledX />
          <SignupInfoText>
            This email is already in use - please use a different one.
          </SignupInfoText>
        </SignupInfoWrapper>
      )}
      {usernameTaken && (
        <SignupInfoWrapper>
          <StyledX />
          <SignupInfoText>
            This username is already in use - please try something else.
          </SignupInfoText>
        </SignupInfoWrapper>
      )}
      {nameContainsGuest && (
        <SignupInfoWrapper>
          <StyledX />
          <SignupInfoText>
            You cannot start your username with "guest" - please try something
            else.
          </SignupInfoText>
        </SignupInfoWrapper>
      )}
      {readyForLogin && (
        <SignupInfoWrapper>
          <StyledCheck />
          <SignupInfoText>
            Registration successful! Please login below with your new
            credentials.
          </SignupInfoText>
        </SignupInfoWrapper>
      )}
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupTitle = styled.h2`
  margin-bottom: 1vh;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: right;
  padding-right: 16px;
`;

const FNameWrapper = styled.div``;

const LNameWrapper = styled.div``;

const EmailWrapper = styled.div``;

const UsernameWrapper = styled.div``;

const PasswordWrapper = styled.div``;

const RegistrationLabel = styled.label`
  margin-right: 1vw;
`;

const RegistrationInput = styled.input`
  width: 150px;
  margin-top: 1vh;
`;

const ShowPasswordButton = styled.button`
  /* display: flex;
  justify-content: center;
  align-items: center; */
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

const SignupInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledX = styled(HiX)`
  color: red;
  font-size: 1.6rem;
`;

const StyledCheck = styled(HiCheck)`
  color: ${COLORS.primary};
  font-size: 1.6rem;
`;

const SignupInfoText = styled.p`
  margin: 1vh 0 1vh 8px;
`;

export default Signup;
