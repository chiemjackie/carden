import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const CardBack = ({ selfRemainingCards, battleCards, selfCardsInBattle }) => {
  return (
    <CardWrapper>
      <CardBackWrapper>
        {battleCards && selfCardsInBattle && (
          <>
            <div>
              Upside-down cards: <div>{battleCards}</div>
            </div>
            <div>
              Card(s) at war:
              {selfCardsInBattle.length > 0 ? (
                selfCardsInBattle.map((card) => (
                  <div key={card.rank}> {card.rank} </div>
                ))
              ) : (
                <div>None</div>
              )}
            </div>
          </>
        )}
        {selfRemainingCards && <div>REMAINING:</div>}
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

export default CardBack;
