import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { GiSunflower } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import { CircularProgress } from "@material-ui/core";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const [guestProfile, setGuestProfile] = useState(false);
  const { profileId } = useParams();
  const history = useHistory();

  const getProfile = (allUsers) => {
    allUsers.forEach((user) => {
      if (profileId === user.username) {
        setUserProfile(user);
        setStatus("idle");
      }
    });
  };

  useEffect(() => {
    if (profileId.slice(0, 5) === "guest") {
      setGuestProfile(true);
      setStatus("idle");
    } else {
      fetch("/account/login", {})
        .then((res) => res.json())
        .then((users) => getProfile(users.data));
    }
  }, [profileId]);

  const logout = (event) => {
    event.preventDefault();
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <ProfilePageWrapper>
      {status === "idle" ? (
        <>
          {guestProfile && (
            <GuestProfileText>
              Sorry, you cannot view a guest profile.
            </GuestProfileText>
          )}
          {!guestProfile && (
            <>
              <ProfilePageElement className="user">
                <StyledUserIcon />
                <Username>{userProfile.username}</Username>
              </ProfilePageElement>
              <ProfilePageElement className="rose">
                <StyledRose />
                <NumRoses>{userProfile.roses}</NumRoses>
              </ProfilePageElement>
              <ProfilePageElement className="sunflower">
                <StyledSunflower />
                <NumSunflowers>{userProfile.sunflowers}</NumSunflowers>
              </ProfilePageElement>
            </>
          )}
          {(guestProfile || profileId === currentUser.username) && (
            <ProfilePageElement>
              <LogoutButton onClick={logout}>LOG OUT</LogoutButton>
            </ProfilePageElement>
          )}
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </ProfilePageWrapper>
  );
};

const ProfilePageWrapper = styled.div`
  margin: 4vh 5vw 2vh;
`;

const GuestProfileText = styled.p`
  color: ${COLORS.secondary};
  font-weight: bold;
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
    color: ${COLORS.orange};
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
