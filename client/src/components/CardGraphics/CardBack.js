import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const CardBack = ({ remainingCards, battleCards, cardsInBattle }) => {
  // console.log(remainingCards);
  // console.log(battleCards);
  // console.log(cardsInBattle);
  return (
    <CardWrapper>
      <CardBackWrapper>
        {battleCards && cardsInBattle && (
          <WarCardsWrapper>
            <div>
              Upside-down cards:{" "}
              <UpsideDownNumber>{battleCards}</UpsideDownNumber>
            </div>
            <div>
              Card(s) at war:
              {cardsInBattle.length > 0 ? (
                cardsInBattle.map((card) => (
                  <CardsInBattle key={card.rank}>{card.rank}</CardsInBattle>
                ))
              ) : (
                <CardsInBattle>None</CardsInBattle>
              )}
            </div>
          </WarCardsWrapper>
        )}

        {remainingCards && (
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
  font-size: 3rem;
`;
const CardsInBattle = styled.p`
  font-size: 3rem;
`;

const WarCardsWrapper = styled.div``;

export default CardBack;
