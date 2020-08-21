import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const GameSelector = () => {
  return (
    <SelectorPageWrapper>
      <WarSelectorWrapper>
        <Selector to="/play/war">War Select</Selector>
      </WarSelectorWrapper>
      <GoFishSelectorWrapper>
        <Selector to="/play/gofish">Go Fish Select</Selector>
      </GoFishSelectorWrapper>
    </SelectorPageWrapper>
  );
};

const SelectorPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Selector = styled(NavLink)`
  color: white;
`;

const WarSelectorWrapper = styled.div`
  background: green;
  padding: 30px;
`;

const GoFishSelectorWrapper = styled.div`
  background: blue;
  padding: 30px;
`;

export default GameSelector;
