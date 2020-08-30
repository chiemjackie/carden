import React, { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { GiSunflower } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { profileId } = useParams();
  const history = useHistory();

  const logout = (event) => {
    event.preventDefault();
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <ProfilePageWrapper>
      <ProfilePageElement className="user">
        <StyledUserIcon />
        <Username>{currentUser.username}</Username>
      </ProfilePageElement>
      <ProfilePageElement className="rose">
        <StyledRose />
        <NumRoses>{currentUser.roses}</NumRoses>
      </ProfilePageElement>
      <ProfilePageElement className="sunflower">
        <StyledSunflower />
        <NumSunflowers>{currentUser.sunflowers}</NumSunflowers>
      </ProfilePageElement>
      {profileId === currentUser.username && (
        <ProfilePageElement>
          <LogoutButton onClick={logout}>LOG OUT</LogoutButton>
        </ProfilePageElement>
      )}
    </ProfilePageWrapper>
  );
};

const ProfilePageWrapper = styled.div`
  margin: 4vh 5vw 2vh;
`;

const ProfilePageElement = styled.div`
  display: flex;
  align-items: center;
  margin: 4vh 0;
  font-size: 1.8rem;
  &.user {
    color: ${COLORS.primary};
  }
  &.rose {
    color: red;
  }
  &.sunflower {
    color: darkorange;
  }
`;

const StyledUserIcon = styled(FiUser)`
  font-size: 2.5rem;
  margin-right: 1vw;
`;

const Username = styled.div``;

const StyledRose = styled(IoIosRose)`
  font-size: 2.5rem;
  margin-right: 1vw;
`;
const NumRoses = styled.div``;

const StyledSunflower = styled(GiSunflower)`
  font-size: 2.5rem;
  margin-right: 1vw;
`;
const NumSunflowers = styled.div``;

const LogoutButton = styled.button`
  background-color: ${COLORS.secondary};
  color: white;
`;

export default Profile;
