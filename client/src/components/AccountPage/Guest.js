import React, { useContext } from "react";
// import styled from "styled-components";

import { CurrentUserContext } from "../CurrentUserContext";
import { useHistory } from "react-router-dom";

const Guest = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const history = useHistory();

  const guestRegister = (event) => {
    event.preventDefault();
    let guestNumber = Math.random().toString(36).substring(2, 9);

    setCurrentUser({
      username: `guest-${guestNumber}`,
      daisies: 100,
      roses: 0,
    });
    history.push("/play");
  };

  return (
    <div>
      <h2>Play as a guest</h2>
      <form onSubmit={guestRegister}>
        <label for="submit">Continue without an account</label>
        <input name="submit" id="submit" type="submit" value="Continue"></input>
        <p>*Note that you will lose all progress upon leaving Carden.</p>
      </form>
    </div>
  );
};

export default Guest;
