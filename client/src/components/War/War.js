import React from "react";
import styled from "styled-components";
import Card from "react-playing-card";

// import { CardSingle } from "../CardGraphics/Cards";

const War = () => {
  return <StyledCard rank="J" suit="C" />;
};

const StyledCard = styled(Card)`
  display: none;
`;

export default War;
