import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const CardBack = ({ remainingCards, battleCards, cardsInBattle }) => {
  return (
    <CardWrapper>
      <CardBackWrapper>
        {battleCards >= 0 ? (
          <WarCardsWrapper>
            <UpsideDownCardsText>
              Upside-down cards:{" "}
              <UpsideDownNumber>{battleCards}</UpsideDownNumber>
            </UpsideDownCardsText>
            <CardsAtWarText>
              Card(s) at war:
              {cardsInBattle.length > 0 ? (
                cardsInBattle.map((card) => (
                  <CardsAtWar key={card.rank}>{card.rank}</CardsAtWar>
                ))
              ) : (
                <CardsAtWar>None</CardsAtWar>
              )}
            </CardsAtWarText>
          </WarCardsWrapper>
        ) : (
          <RemainingCardsWrapper>
            <RemainingCardsText>Remaining cards:</RemainingCardsText>
            <RemainingCardsNumber>{remainingCards}</RemainingCardsNumber>
          </RemainingCardsWrapper>
        )}
      </CardBackWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 20vh;
  height: 28vh;
  border: 1px solid black;
  border-radius: 10px;
  background-color: ${COLORS.cardback};
`;

const CardBackWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: white;
`;

const RemainingCardsWrapper = styled.div``;

const RemainingCardsText = styled.p``;
const RemainingCardsNumber = styled.p`
  font-size: 3rem;
`;

const UpsideDownNumber = styled.p`
  font-size: 2rem;
`;
const CardsAtWar = styled.p`
  font-size: 2rem;
`;

const UpsideDownCardsText = styled.div``;
const CardsAtWarText = styled.div`
  margin-top: 20%;
`;

const WarCardsWrapper = styled.div``;

export default CardBack;
