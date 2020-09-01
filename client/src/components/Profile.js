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
import wallpaper from "../assets/homepage_wallpaper.jpg";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const [guestProfile, setGuestProfile] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const { profileId } = useParams();
  const history = useHistory();

  let roses;
  let sunflowers;
  let username;
  let _id;

  if (currentUser) {
    roses = parseInt(currentUser.roses);
    sunflowers = parseInt(currentUser.sunflowers);
    username = currentUser.username;
    _id = currentUser._id;
  }

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

  const buyRose = () => {
    setCurrentUser((prevstate) => {
      return {
        ...prevstate,
        roses: roses + 1,
        sunflowers: sunflowers - 1000,
      };
    });
    fetch("/account/flowers", {
      method: `put`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        roses: roses + 1,
        sunflowers: sunflowers - 1000,
      }),
    }).then((res) => res.text());
  };

  const buySunflowers = () => {
    setCurrentUser((prevstate) => {
      return {
        ...prevstate,
        roses: roses - 1,
        sunflowers: sunflowers + 1000,
      };
    });
    fetch("/account/flowers", {
      method: `put`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        roses: roses - 1,
        sunflowers: sunflowers + 1000,
      }),
    }).then((res) => res.text());
  };

  const claim = () => {
    setCurrentUser((prevstate) => {
      return {
        ...prevstate,
        sunflowers: sunflowers + 1000,
      };
    });
    fetch("/account/flowers", {
      method: `put`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        sunflowers: sunflowers + 1000,
      }),
    }).then((res) => res.text());
    setClaimed(true);
  };

  return (
    <>
      <Wallpaper></Wallpaper>
      <ProfilePageWrapper>
        {status === "idle" ? (
          <>
            {guestProfile && profileId !== username && (
              <GuestProfileText>
                Sorry, you cannot view a guest profile.
              </GuestProfileText>
            )}
            {currentUser && profileId === username && (
              <>
                <ProfilePageElement className="user">
                  <StyledUserIcon />
                  <Username>{username}</Username>
                </ProfilePageElement>
                <ProfilePageElement className="rose">
                  <StyledRose />
                  <NumRoses>{roses}</NumRoses>
                </ProfilePageElement>
                <BuyRoseButton onClick={buyRose}>
                  Buy a Rose (Cost: 1000 Sunflowers)
                </BuyRoseButton>
                <ProfilePageElement className="sunflower">
                  <StyledSunflower />
                  <NumSunflowers>{sunflowers}</NumSunflowers>
                </ProfilePageElement>
                <BuySunflowerButton onClick={buySunflowers}>
                  Buy 1000 Sunflowers (Cost: 1 Rose)
                </BuySunflowerButton>
                {roses <= 0 && sunflowers <= 0 && (
                  <ClaimButton
                    name="claimButton"
                    id="claimButton"
                    onClick={claim}
                  >
                    Claim free 1000 sunflowers
                  </ClaimButton>
                )}
              </>
            )}
            {((currentUser && !guestProfile && profileId !== username) ||
              (!currentUser && !guestProfile)) && (
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

            {currentUser && profileId === username && (
              <ProfilePageElement>
                <LogoutButton onClick={logout}>Log out</LogoutButton>
              </ProfilePageElement>
            )}
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </ProfilePageWrapper>
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

const ProfilePageWrapper = styled.div`
  margin: 5px auto;
  height: 77vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GuestProfileText = styled.p`
  color: ${COLORS.secondary};
  font-weight: bold;
  font-size: 24px;
  font-family: "Playfair Display", serif;
`;

const ProfilePageElement = styled.div`
  display: flex;
  align-items: center;
  margin: 2vh 0;
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

const Username = styled.div`
  font-weight: bold;
  font-family: "Playfair Display", serif;
`;

const StyledRose = styled(IoIosRose)`
  font-size: 2.5rem;
  margin-right: 1vw;
`;
const NumRoses = styled.div``;

const BuyRoseButton = styled.button`
  background-color: ${COLORS.red};
  color: white;
  font-family: "Playfair Display", serif;
`;

const StyledSunflower = styled(GiSunflower)`
  font-size: 2.5rem;
  margin-right: 1vw;
`;
const NumSunflowers = styled.div``;

const BuySunflowerButton = styled.button`
  background-color: ${COLORS.orange};
  color: white;
  font-family: "Playfair Display", serif;
`;

const ClaimButton = styled.button`
  margin-top: 4vh;
  background-color: ${COLORS.tertiary};
  /* color: white; */
  font-family: "Playfair Display", serif;
`;

const LogoutButton = styled.button`
  margin-top: 4vh;
  background-color: ${COLORS.blue};
  color: white;
  font-family: "Playfair Display", serif;
`;

export default Profile;
