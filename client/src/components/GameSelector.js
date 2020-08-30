import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const GameSelector = () => {
  return (
    <SelectorPageWrapper>
      <WarSelectorWrapper to="/play/war">
        <WarTitleBox>
          <WarTitleBox>
            <WarTitleText>War</WarTitleText>
          </WarTitleBox>
        </WarTitleBox>
        <WarRulesBox>
          <WarRulesTextTop>
            The deck is divided evenly, with each player receiving 26 random
            cards.
          </WarRulesTextTop>
          <WarRulesText>
            Each player turns up a card at the same time and the player with the
            higher card takes both cards and puts them, face down, on the bottom
            of his stack.
          </WarRulesText>
          <WarRulesText>
            If the cards are the same rank, it is War. Each player turns up one
            card face down and one card face up. The player with the higher
            cards takes both piles (six cards). If the turned-up cards are again
            the same rank, each player places another card face down and turns
            another card face up. The player with the higher card takes all 10
            cards, and so on.
          </WarRulesText>
          <WarRulesText>
            The game ends when one player runs out of cards.
          </WarRulesText>
        </WarRulesBox>
      </WarSelectorWrapper>
      <GoFishSelectorWrapper to="/play/gofish">
        <GoFishTitleBox>
          <GoFishTitleText>Go Fish</GoFishTitleText>
        </GoFishTitleBox>
        <GoFishRulesBox>
          <GoFishRulesTextTop>
            Each player receives 7 random cards to form their hand. The
            remainder of the deck is placed face down on the table to form the
            stock.
          </GoFishRulesTextTop>
          <GoFishRulesText>
            A random player is chosen to start. The player requests a card rank
            they currently possess (e.g. 3, 10, King, Ace) from the other
            player, a process called "fishing". The fished player hands over all
            requested cards. If any cards are fished, the fisher can ask for
            another rank. If no cards are fished, it's "Go fish!" - the fisher
            draws the top card of the stock and the other player can now fish.
          </GoFishRulesText>
          <GoFishRulesText>
            Once the fisher gets all four cards of a rank, the player sets them
            down on the table, and still continues fishing until "Go fish!". If
            a player has no cards, on their turn, they draw from the stock and
            then ask for that rank. If there are no cards left, that player
            loses.
          </GoFishRulesText>
          <GoFishRulesText>
            The game ends when all thirteen ranks have been collected. Whoever
            collects the most ranks wins.
          </GoFishRulesText>
        </GoFishRulesBox>
      </GoFishSelectorWrapper>
    </SelectorPageWrapper>
  );
};

const SelectorPageWrapper = styled.div``;

const WarSelectorWrapper = styled(NavLink)`
  display: flex;
  background: green;
  color: white;
  align-items: center;
  min-height: 30%;
  height: 30vh;
`;

const WarTitleBox = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 20%;
`;

const WarTitleText = styled.h2``;

const WarRulesBox = styled.div`
  width: 80%;
  padding: 3vh;
`;

const WarRulesTextTop = styled.p``;

const WarRulesText = styled.p`
  margin-top: 2vh;
`;

const GoFishSelectorWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  background: purple;
  color: white;
  min-height: 30%;
  height: 35vh;
`;

const GoFishTitleBox = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 20%;
`;

const GoFishTitleText = styled.h2``;

const GoFishRulesBox = styled.div`
  width: 80%;
  padding: 3vh;
`;

const GoFishRulesTextTop = styled.p``;

const GoFishRulesText = styled.p`
  margin-top: 2vh;
`;

export default GameSelector;
