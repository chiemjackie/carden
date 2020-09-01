import React, { useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import wallpaper from "../assets/homepage_wallpaper.jpg";

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
    <>
      <Wallpaper></Wallpaper>
      <ProfileSearchWrapper>
        <ProfileSearchTitle>Find a Player</ProfileSearchTitle>
        <ProfileSearchbar
          id="username"
          type="text"
          placeholder="Username"
        ></ProfileSearchbar>
        <ProfileSearchButton onClick={search}>Search</ProfileSearchButton>
        {usernameMatch === false && (
          <ProfileSearchText>That user does not exist.</ProfileSearchText>
        )}
      </ProfileSearchWrapper>
    </>
  );
};

const Wallpaper = styled.div`
  position: absolute;
  background-size: cover;
  background-image: url(${wallpaper});
  background-position: center;
  background-repeat: "no-repeat";
  top: 63px;
  height: 77vh;
  width: 100%;
  opacity: 0.4;
  z-index: -1;
`;

const ProfileSearchWrapper = styled.div`
  height: 77vh;
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileSearchTitle = styled.h3`
  margin-bottom: 1vh;
  font-family: "Playfair Display", serif;
`;
const ProfileSearchbar = styled.input`
  width: 150px;
  margin-top: 1vh;
`;

const ProfileSearchButton = styled.button`
  margin: 2vh 0 2vh;
  font-family: "Playfair Display", serif;
`;

const ProfileSearchText = styled.p``;

export default ProfileSearch;
