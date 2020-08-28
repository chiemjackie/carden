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

    fetch("/account/signup", {
      method: `post`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
    </div>
  );
};

export default Signup;
