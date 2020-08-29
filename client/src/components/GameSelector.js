import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const GameSelector = () => {
  return (
    <SelectorPageWrapper>
      <WarSelectorWrapper to="/play/war">War Select</WarSelectorWrapper>
      <GoFishSelectorWrapper to="/play/gofish">
        Go Fish Select
      </GoFishSelectorWrapper>
    </SelectorPageWrapper>
  );
};

const SelectorPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const WarSelectorWrapper = styled(NavLink)`
  background: green;
  padding: 30px;
  color: white;
`;

const GoFishSelectorWrapper = styled(NavLink)`
  background: blue;
  padding: 30px;
  color: white;
`;

export default GameSelector;
