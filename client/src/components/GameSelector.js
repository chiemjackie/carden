import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import warWallpaper from "../assets/war_wallpaper.jpg";
import goFishWallpaper from "../assets/go_fish_wallpaper.jpg";

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

const SelectorPageWrapper = styled.div`
  margin: 5px auto;
  text-shadow: #000 0px 0px 1px;
`;

const WarSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-image: url(${warWallpaper});
  background-position: center;
  opacity: 0.5;
  height: 38.5vh;
  color: red;
  &:hover {
    opacity: 1;
  }
`;

const WarTitleBox = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const WarTitleText = styled.h2`
  margin-bottom: 3vh;
  font-family: "Playfair Display", serif;
  font-weight: bold;
  color: red;
  font-size: 48px;
  text-shadow: #000 0px 0px 1px;
`;

const WarSelectionNavLink = styled(NavLink)`
  margin-top: 3vh;
  color: white;
  font-family: "Playfair Display", serif;
  font-size: 24px;
  text-shadow: #000 0px 0px 1px;
`;

const WarRulesBox = styled.div`
  width: 50%;
  padding: 3vh;
`;

const WarRulesTextTop = styled.h4`
  font-family: "Playfair Display", serif;
`;

const WarRulesTextTitle = styled.h4`
  padding-top: 25px;
  font-family: "Playfair Display", serif;
`;

const WarRulesText = styled.p`
  margin-top: 1vh;
`;

const GoFishSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-image: url(${goFishWallpaper});
  background-position: 50% 80%;
  opacity: 0.5;
  color: white;
  text-shadow: #000 0px 0px 1px;
  height: 38.5vh;
  &:hover {
    opacity: 1;
  }
`;

const GoFishTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
`;

const GoFishTitleText = styled(NavLink)`
  font-family: "Playfair Display", serif;
  font-weight: bold;
  color: white;
  font-size: 48px;
  text-shadow: #000 0px 0px 1px;
`;

const GoFishRulesBox = styled.div`
  width: 50%;
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
