import React, { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GiSunflower } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";
import { FiUser } from "react-icons/fi";

import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { profileId } = useParams();
  const history = useHistory();

  const logout = () => {
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <ProfilePageWrapper>
      <ProfilePageElement>
        <FiUser />
        <Username>{currentUser.username}</Username>
      </ProfilePageElement>
      <ProfilePageElement>
        <IoIosRose />
        <Roses>{currentUser.roses}</Roses>
      </ProfilePageElement>
      <ProfilePageElement>
        <GiSunflower />
        <Sunflowers>{currentUser.sunflowers}</Sunflowers>
      </ProfilePageElement>
      <ProfilePageElement>
        <LogoutButton onClick={logout}>LOG OUT</LogoutButton>
      </ProfilePageElement>
    </ProfilePageWrapper>
  );
};

const ProfilePageWrapper = styled.div`
  margin: 10vw;
`;

const ProfilePageElement = styled.div`
  margin: 5vw;
`;
const Username = styled.div``;
const Roses = styled.div``;
const Sunflowers = styled.div``;
const LogoutButton = styled.button``;

export default Profile;
