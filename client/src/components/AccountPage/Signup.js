import React, { useState } from "react";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Signup = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [emailTaken, setEmailTaken] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
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
        setUsernameTaken(true);
      } else if (!emailTakenFlag && !usernameTakenFlag) {
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
        }),
      });
  };

  return (
    <div>
      <h2>Register for an account</h2>
      <form onSubmit={register}>
        <div>
          <label htmlFor="fname">First name:</label>
          <input
            id="fname"
            name="fname"
            type="text"
            placeholder=""
            required
          ></input>
          <label htmlFor="lname">Last name:</label>
          <input
            id="lname"
            name="lname"
            type="text"
            placeholder=""
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder=""
            required
          ></input>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder=""
            required
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
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
        <input type="submit" value="Register"></input>
      </form>
      {emailTaken && (
        <div>This email is already in use - please use a different one.</div>
      )}
      {usernameTaken && (
        <div>This username is already in use - please try something else.</div>
      )}
      {readyForLogin && (
        <div>
          Registration successful! Please login below with your new credentials.
        </div>
      )}
    </div>
  );
};

export default Signup;
