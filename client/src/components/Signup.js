import React, { useState } from "react";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Signup = () => {
  const [passwordType, setPasswordType] = useState("password");

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
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log({
      fname: fname,
      lname: lname,
      email: email,
      username: username,
      password: password,
    });
  };

  return (
    <div>
      <div>Register for an account</div>
      <form onSubmit={register}>
        <div>
          <label for="fname">First name:</label>
          <input
            id="fname"
            name="fname"
            type="text"
            placeholder=""
            required
          ></input>
          <label for="lname">Last name:</label>
          <input
            id="lname"
            name="lname"
            type="text"
            placeholder=""
            required
          ></input>
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder=""
            required
          ></input>
        </div>
        <div>
          <label for="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder=""
            required
          ></input>
        </div>
        <div>
          <label for="password">Password:</label>
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
    </div>
  );
};

export default Signup;
