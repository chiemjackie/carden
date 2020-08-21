import React, { useState } from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

const AgainstHouse = () => {
  const [turn, setTurn] = useState(0);
  const [opponentCard, setOpponentCard] = useState("");
  const [selfCard, setSelfCard] = useState("");
  const [status, setStatus] = useState("Press to start the game");
  const [opponentRemainingCards, setOpponentRemainingCards] = useState(26);
  const [selfRemainingCards, setSelfRemainingCards] = useState(26);

  function incrementTurn() {
    setTurn(turn + 1);
    const newOpponentCard = Math.ceil(Math.random() * 13);
    const newSelfCard = Math.ceil(Math.random() * 13);
    setOpponentCard(newOpponentCard);
    setSelfCard(newSelfCard);
    // setOpponentRemainingCards(opponentRemainingCards - 1);
    // setSelfRemainingCards(selfRemainingCards - 1);
    updateStatus(newOpponentCard, newSelfCard);
  }

  const updateStatus = (newOpponentCard, newSelfCard) => {
    if (newOpponentCard > newSelfCard) {
      setOpponentRemainingCards(opponentRemainingCards + 1);
      setSelfRemainingCards(selfRemainingCards - 1);
      setStatus("lost");
    } else if (newOpponentCard < newSelfCard) {
      setStatus("won");
      setSelfRemainingCards(selfRemainingCards + 1);
      setOpponentRemainingCards(opponentRemainingCards - 1);
    } else {
      setStatus("draw");
    }
  };

  return (
    <GameWrapper>
      <OpponentSide>
        <CardPlaceholder>
          Cards remaining: {opponentRemainingCards}
        </CardPlaceholder>
        <CardPlaceholder>{opponentCard}</CardPlaceholder>
      </OpponentSide>
      <GameFunctions>
        <GameText>Hit next I guess</GameText>
        <NextButton onClick={incrementTurn}>Next turn</NextButton>
        <Status>{status}</Status>
      </GameFunctions>
      <SelfSide>
        <CardPlaceholder>Cards remaining: {selfRemainingCards}</CardPlaceholder>
        <CardPlaceholder>{selfCard}</CardPlaceholder>
      </SelfSide>
    </GameWrapper>
  );
};

const GameWrapper = styled.div`
  position: relative;
  margin: 0 20px;
  height: calc(100vh - 120px);
`;

const OpponentSide = styled.section`
  display: flex;
  height: 44%;
  background-color: ${COLORS.secondary};
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
`;

const SelfSide = styled.section`
  display: flex;
  height: 44%;
  background-color: ${COLORS.primary};
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
`;

const GameFunctions = styled.section`
  display: flex;
  height: 12%;
  /* background-color: red; */
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
`;

const GameText = styled.p`
  color: ${COLORS.secondary};
`;

const NextButton = styled.button`
  margin-left: 30px;
`;

const Status = styled.div`
  margin-left: 30px;
`;

const CardPlaceholder = styled.div`
  display: flex;
  border: 1px solid black;
  height: 75%;
  width: 25%;
  margin: 0 15px;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default AgainstHouse;
