import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const GameSelector = () => {
  return (
    <SelectorPageWrapper>
      <WarSelectorWrapper to="/play/war">
        <WarTitleBox>
          <WarTitleText>War</WarTitleText>
          <InvisibleLineBreak />
          <WarSelectionNavLink to="/play/war/onecard">
            One Card Battle
          </WarSelectionNavLink>
          <InvisibleLineBreak />
          <WarSelectionNavLink to="/play/war/fulldeck">
            Full Deck War
          </WarSelectionNavLink>
        </WarTitleBox>
        <WarRulesBox>
          <WarRulesTextTop>One Card Battle</WarRulesTextTop>
          <WarRulesText>
            A random player starts as dealer. Each turn, the dealer swaps. Each
            player is dealt a card. The highest rank wins (e.g. 3, 10, King, and
            Aces are high). If the ranks are tied, the dealer automatically
            wins.
          </WarRulesText>
          <WarRulesTextTitle>Full Deck War</WarRulesTextTitle>
          <WarRulesText>
            The deck is divided evenly, with each player receiving 26 random
            cards.
          </WarRulesText>
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
      <GoFishSelectorWrapper>
        <GoFishTitleBox>
          <GoFishTitleText to="/play/gofish">Go Fish</GoFishTitleText>
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

const WarSelectorWrapper = styled.div`
  display: flex;
  background: green;
  color: white;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

const WarTitleBox = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

const WarTitleText = styled.h2`
  margin-bottom: 3vh;
`;

const WarSelectionNavLink = styled(NavLink)`
  margin-top: 3vh;
  color: white;
`;

const WarRulesBox = styled.div`
  width: 80%;
  padding: 3vh;
`;

const WarRulesTextTop = styled.h4``;

const WarRulesTextTitle = styled.h4`
  padding-top: 25px;
`;

const WarRulesText = styled.p`
  margin-top: 1vh;
`;

const GoFishSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  background: purple;
  color: white;
  height: 32vh;
`;

const GoFishTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
`;

const GoFishTitleText = styled(NavLink)`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const GoFishRulesBox = styled.div`
  width: 80%;
  padding: 3vh;
`;

const GoFishRulesTextTop = styled.p``;

const GoFishRulesText = styled.p`
  margin-top: 1vh;
`;

const InvisibleLineBreak = styled.div`
  width: 100%;
`;

export default GameSelector;
