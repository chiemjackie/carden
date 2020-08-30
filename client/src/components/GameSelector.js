import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const GameSelector = () => {
  return (
    <SelectorPageWrapper>
      <WarSelectorWrapper to="/play/war">
        <GameTitle>War</GameTitle>
        <GameRulesWrapper>
          <GameRulesText>
            The deck is divided evenly, with each player receiving 26 cards.
          </GameRulesText>
          <GameRulesText>
            Each player turns up a card at the same time and the player with the
            higher card takes both cards and puts them, face down, on the bottom
            of his stack.
          </GameRulesText>
          <GameRulesText>
            If the cards are the same rank, it is War. Each player turns up one
            card face down and one card face up. The player with the higher
            cards takes both piles (six cards). If the turned-up cards are again
            the same rank, each player places another card face down and turns
            another card face up. The player with the higher card takes all 10
            cards, and so on.
          </GameRulesText>
        </GameRulesWrapper>
      </WarSelectorWrapper>
      <GoFishSelectorWrapper to="/play/gofish">
        <GameTitle>Go Fish</GameTitle>
        <GameRulesWrapper>
          <GameRulesText>
            The deck is divided evenly, with each player receiving 26 cards.
          </GameRulesText>
          <GameRulesText>
            Each player turns up a card at the same time and the player with the
            higher card takes both cards and puts them, face down, on the bottom
            of his stack.
          </GameRulesText>
          <GameRulesText>
            If the cards are the same rank, it is War. Each player turns up one
            card face down and one card face up. The player with the higher
            cards takes both piles (six cards). If the turned-up cards are again
            the same rank, each player places another card face down and turns
            another card face up. The player with the higher card takes all 10
            cards, and so on.
          </GameRulesText>
        </GameRulesWrapper>
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
  padding: 3vw;
  color: white;
  max-width: 45vw;
`;

const GoFishSelectorWrapper = styled(NavLink)`
  background: blue;
  padding: 3vw;
  color: white;
  max-width: 45vw;
`;

const GameTitle = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const GameRulesWrapper = styled.div``;

const GameRulesText = styled.p`
  margin-top: 2vh;
`;

export default GameSelector;
