import React, { useContext } from "react";
import styled from "styled-components";

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
      sunflowers: 100,
      roses: 0,
    });
    history.push("/play");
  };

  return (
    <GuestLoginWrapper>
      <GuestLoginTitle>Play as a guest</GuestLoginTitle>
      <GuestLoginForm onSubmit={guestRegister}>
        <GuestLoginInput
          name="submit"
          id="submit"
          type="submit"
          value="Continue as Guest"
        ></GuestLoginInput>
        <GuestLoginText>
          *Note that your progress will not be saved when
        </GuestLoginText>
        <GuestLoginText>
          browser data is cleared or upon logging out.
        </GuestLoginText>
      </GuestLoginForm>
    </GuestLoginWrapper>
  );
};

const GuestLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GuestLoginTitle = styled.h2`
  margin-bottom: 1vh;
`;
const GuestLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GuestLoginInput = styled.input`
  width: 50%;
  margin: 2vh 0 1vh;
`;
const GuestLoginText = styled.p``;

export default Guest;
