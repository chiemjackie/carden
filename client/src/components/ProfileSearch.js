import React, { useState } from "react";
// import styled from "styled-components";

import { useHistory } from "react-router-dom";

const ProfileSearch = () => {
  const [usernameMatch, setUsernameMatch] = useState(null);
  const history = useHistory();

  const search = (event) => {
    event.preventDefault();
    let usernameInput = document.getElementById("username").value;

    const verifyUser = (allUsers) => {
      for (let i = 0; i < allUsers.length; i++) {
        if (usernameInput === allUsers[i].username) {
          setUsernameMatch(true);
          history.push(`/profile/${usernameInput}`);
        } else {
          setUsernameMatch(false);
        }
      }
    };

    fetch("/account/login", {})
      .then((res) => res.json())
      .then((users) => verifyUser(users.data));
  };

  return (
    <div>
      <p>Find a player:</p>
      <input id="username" type="text" placeholder="Username"></input>
      <button onClick={search}>Search</button>
      {usernameMatch === false && <p>That user does not exist.</p>}
    </div>
  );
};

export default ProfileSearch;
