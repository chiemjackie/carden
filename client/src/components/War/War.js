import React, { useState } from "react";
import styled from "styled-components";
import AgainstHouse from "./AgainstHouse";
import AgainstFriend from "./AgainstFriend";

import { COLORS } from "../../constants";

const War = () => {
  const [selection, setSelection] = useState(null);

  function selectHouse() {
    setSelection("house");
  }

  function selectFriend() {
    setSelection("friend");
  }

  if (selection === null) {
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
  } else if (selection === "house") {
    return <AgainstHouse />;
  } else if (selection === "friend") {
    return <AgainstFriend />;
  }
};

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
