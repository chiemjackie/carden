import React from "react";
import styled from "styled-components";

import { GiSpades, GiClubs, GiDiamonds, GiHearts } from "react-icons/gi";
import { COLORS } from "../../constants";

const CardFront = ({ card }) => {
  return (
    <CardWrapper>
      <CardContentWrapper>
        {card.color === "black" ? (
          <CardRankBlack>{card.rank}</CardRankBlack>
        ) : (
          <CardRankRed>{card.rank}</CardRankRed>
        )}
        <SuitWrapper>
          {card.suit === "spade" && <StyledSpades />}
          {card.suit === "club" && <StyledClubs />}
          {card.suit === "diamond" && <StyledDiamonds />}
          {card.suit === "heart" && <StyledHearts />}
        </SuitWrapper>
      </CardContentWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 20vh;
  height: 28vh;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
`;

const CardContentWrapper = styled.div`
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 11%;
  font-size: 3.5rem;
`;

const CardRankBlack = styled.p``;

const CardRankRed = styled.p`
  color: ${COLORS.red};
`;

const SuitWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3%;
  margin-right: -5%;
`;

const StyledSpades = styled(GiSpades)``;

const StyledClubs = styled(GiClubs)`
  font-size: 3.3rem;
`;

const StyledDiamonds = styled(GiDiamonds)`
  font-size: 3.7rem;
  color: ${COLORS.red};
`;

const StyledHearts = styled(GiHearts)`
  font-size: 3.3rem;
  color: ${COLORS.red};
`;

export default CardFront;
