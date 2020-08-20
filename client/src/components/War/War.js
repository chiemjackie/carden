import React from "react";
import styled from "styled-components";

import { CardSingle } from "../CardGraphics/Cards";

const War = () => {
  return (
    <CardSingle
      id={`S_A`}
      card={{
        suit: `S`,
        rank: `A`,
        backColor: `#1A1919`,
        // color: item.suit === "D" || item.suit === "H" ? `#D33E43` : `#1A1919`,
      }}
      // status={?}
    />
    // substitute for item here?
  );
};

const StyledCard = styled(CardSingle)`
  padding: 50px;
  background-color: red;
`;

export default War;
