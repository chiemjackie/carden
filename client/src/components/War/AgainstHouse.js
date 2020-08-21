import React, { useState } from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

const opponentDeck = [
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
];
const selfDeck = [
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
];

let opponentCurrentCard = "";
let selfCurrentCard = "";

const initShuffle = () => {
  for (let i = opponentDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = opponentDeck[i];
    opponentDeck[i] = opponentDeck[j];
    opponentDeck[j] = temp;
  }

  for (let i = selfDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = selfDeck[i];
    selfDeck[i] = selfDeck[j];
    selfDeck[j] = temp;
  }
};

initShuffle();

const AgainstHouse = () => {
  console.log("opponent", opponentDeck);
  console.log("self", selfDeck);

  const [turn, setTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState("Start");

  let opponentRemainingCards = opponentDeck.length;
  let selfRemainingCards = selfDeck.length;

  const incrementTurn = () => {
    setTurn(turn + 1);
    opponentCurrentCard = opponentDeck.shift();
    selfCurrentCard = selfDeck.shift();
    updateDecksAndStatus();
  };

  const updateDecksAndStatus = () => {
    if (opponentCurrentCard > selfCurrentCard) {
      setGameStatus("Lost");
      opponentDeck.push(opponentCurrentCard, selfCurrentCard);
      // console.log(opponentDeck);
    } else if (opponentCurrentCard < selfCurrentCard) {
      setGameStatus("Won");
      selfDeck.push(selfCurrentCard, opponentCurrentCard);
      // console.log(selfDeck);
    } else {
      setGameStatus("War!");
      opponentDeck.push(opponentCurrentCard);
      selfDeck.push(selfCurrentCard);
    }
  };

  return (
    <GameWrapper>
      <OpponentSide>
        <CardPlaceholder>
          Cards remaining: {opponentRemainingCards}
        </CardPlaceholder>
        <CardPlaceholder>{opponentCurrentCard}</CardPlaceholder>
      </OpponentSide>
      <GameFunctions>
        {opponentRemainingCards === 0 && <div>You won!</div>}
        {selfRemainingCards === 0 && <div>You lost!</div>}
        <GameText>Hit next I guess</GameText>
        <NextButton onClick={incrementTurn}>Next turn</NextButton>
        <Rounds>Round: {turn}</Rounds>
        <Status>{gameStatus}</Status>
      </GameFunctions>
      <SelfSide>
        <CardPlaceholder>Cards remaining: {selfRemainingCards}</CardPlaceholder>
        <CardPlaceholder>{selfCurrentCard}</CardPlaceholder>
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

const Rounds = styled.div`
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
