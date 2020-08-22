import React, { useState } from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

const startingDeck = [
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  9,
  9,
  9,
  9,
  10,
  10,
  10,
  10,
  11,
  11,
  11,
  11,
  12,
  12,
  12,
  12,
  13,
  13,
  13,
  13,
];
let oppDeck = [];
let selfDeck = [];

let oppCurrentCard = "";
let selfCurrentCard = "";
let battleCards = 0;
let oppCardsInBattle = [];
let selfCardsInBattle = [];

const initShuffle = () => {
  for (let i = startingDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = startingDeck[i];
    startingDeck[i] = startingDeck[j];
    startingDeck[j] = temp;
  }
  splitDeck();
};

const splitDeck = () => {
  for (let i = 0; i < 26; i++) {
    oppDeck.push(startingDeck[i]);
    selfDeck.push(startingDeck[i + 26]);
  }
};

initShuffle();

const AgainstHouse = () => {
  const [turn, setTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState("Start");

  let oppRemainingCards = oppDeck.length - battleCards;
  let selfRemainingCards = selfDeck.length - battleCards;

  const incrementTurn = () => {
    setTurn(turn + 1);
    oppCurrentCard = oppDeck.shift();
    selfCurrentCard = selfDeck.shift();
    updateDecksAndStatus();
    checkIfWon();
  };

  console.log(selfRemainingCards);
  console.log(oppRemainingCards);

  const updateDecksAndStatus = () => {
    if (oppCurrentCard > selfCurrentCard) {
      setGameStatus("Battle lost!");
      oppDeck.push(oppCurrentCard, selfCurrentCard);
      while (battleCards > 0) {
        oppDeck.push(selfDeck.shift());
        oppDeck.push(oppDeck.shift());
        battleCards--;
      }
      for (let i = 0; i < oppCardsInBattle.length; i++) {
        oppDeck.push(oppCardsInBattle[i]);
        oppDeck.push(selfCardsInBattle[i]);
      }
      oppCardsInBattle = [];
      selfCardsInBattle = [];
    } else if (oppCurrentCard < selfCurrentCard) {
      setGameStatus("Battle won!");
      selfDeck.push(selfCurrentCard, oppCurrentCard);
      while (battleCards > 0) {
        selfDeck.push(oppDeck.shift());
        selfDeck.push(selfDeck.shift());
        battleCards--;
      }
      for (let i = 0; i < oppCardsInBattle.length; i++) {
        selfDeck.push(oppCardsInBattle[i]);
        selfDeck.push(selfCardsInBattle[i]);
      }
      oppCardsInBattle = [];
      selfCardsInBattle = [];
    } else {
      setGameStatus("Heated battle!");
      oppCardsInBattle.push(oppCurrentCard);
      selfCardsInBattle.push(selfCurrentCard);
      battleCards++;
    }
  };

  const checkIfWon = () => {
    if (oppCurrentCard > selfCurrentCard && selfDeck.length <= 0) {
      setGameStatus("You've LOST the war!");
    } else if (oppCurrentCard < selfCurrentCard && oppDeck.length <= 0) {
      setGameStatus("You've WON the war!");
    }
  };

  const reset = () => {
    setTurn(0);
    setGameStatus("Start");
    oppDeck = [];
    selfDeck = [];
    oppCurrentCard = "";
    selfCurrentCard = "";
    battleCards = 0;
    oppCardsInBattle = [];
    selfCardsInBattle = [];
    initShuffle();
  };

  return (
    <GameWrapper>
      <OppSide>
        <CardPlaceholder>Cards remaining: {oppRemainingCards}</CardPlaceholder>
        <CardPlaceholder>{oppCurrentCard}</CardPlaceholder>
        <CardPlaceholder>
          {" "}
          <div>
            <div>
              Upside-down cards: <div>{battleCards}</div>
            </div>
            <div>
              Card(s) at war:
              {oppCardsInBattle.length > 0 ? (
                oppCardsInBattle.map((card) => <div key="card"> {card} </div>)
              ) : (
                <div>None</div>
              )}
            </div>
          </div>
        </CardPlaceholder>
      </OppSide>
      <GameFunctions>
        <GameText>Hit next I guess</GameText>
        <NextButton onClick={incrementTurn}>Next turn</NextButton>
        <Rounds>Round: {turn}</Rounds>
        <Status>{gameStatus}</Status>
        <NextButton onClick={reset}>Reset</NextButton>
      </GameFunctions>
      <SelfSide>
        <CardPlaceholder>Cards remaining: {selfRemainingCards}</CardPlaceholder>
        <CardPlaceholder>{selfCurrentCard}</CardPlaceholder>
        <CardPlaceholder>
          {/* <div>Battle Cards: {battleCards}</div> */}
          <div>
            <div>
              Upside-down cards: <div>{battleCards}</div>
            </div>
            <div>
              Card(s) at war:
              {selfCardsInBattle.length > 0 ? (
                selfCardsInBattle.map((card) => <div key="card"> {card} </div>)
              ) : (
                <div>None</div>
              )}
            </div>
          </div>
        </CardPlaceholder>
      </SelfSide>
    </GameWrapper>
  );
};

const GameWrapper = styled.div`
  position: relative;
  margin: 0 20px;
  height: calc(100vh - 120px);
`;

const OppSide = styled.section`
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
