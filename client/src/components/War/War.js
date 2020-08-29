import React, { useState } from "react";
import styled from "styled-components";
// import Card from "react-playing-card";
import AgainstHouse from "./AgainstHouse";

import { COLORS } from "../../constants";

// import { CardSingle } from "../CardGraphics/Cards";

const War = () => {
  const [selection, setSelection] = useState(null);

  function selectHouse() {
    setSelection("house");
  }

  function selectFriend() {
    setSelection("friend");
  }

  if (selection === null) {
    return <AgainstHouse />;
  } else if (selection === "house") {
    return (
      <SelectionWrapper>
        <PlayAgainstText>Play against...</PlayAgainstText>
        <InitButton onClick={selectHouse}>
          <AgainstButtonText>The House</AgainstButtonText>
        </InitButton>
        <InitButton onClick={selectFriend}>
          <AgainstButtonText>Against a Friend</AgainstButtonText>
        </InitButton>
      </SelectionWrapper>
    );
  } else if (selection === "friend") {
    return <div>Against friend</div>;
  }
};

// <StyledCard rank="J" suit="C" />;
// const StyledCard = styled(Card)``;

const SelectionWrapper = styled.div`
  display: flex;
  margin: 0 20px;
  justify-content: space-around;
`;

const PlayAgainstText = styled.div`
  font-weight: bold;
  margin: 12px 0;
`;

const InitButton = styled.button`
  /* display: block; */
  background-color: ${COLORS.primary};
  margin: 10px;
  &:hover {
    background-color: red;
  }
`;

const AgainstButtonText = styled.span`
  /* color: ${COLORS.secondary}; */
  font-weight: bold;
`;

export default War;
