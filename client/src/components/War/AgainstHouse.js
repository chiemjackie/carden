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
let disableButtonStatus = false;
let enableAutoPlay = false;
let interval;
let turn = 0;

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
  console.log("OPP", oppDeck);
  console.log("SELF", selfDeck);

  const [gameStatus, setGameStatus] = useState("Commence the war!");
  const [gameText, setGameText] = useState("No prisoners.");

  let oppRemainingCards = oppDeck.length - battleCards;
  let selfRemainingCards = selfDeck.length - battleCards;
  let average = (selfDeck.length + oppDeck.length + 2 * battleCards) / 2;

  const toggleAutoPlay = () => {
    enableAutoPlay = !enableAutoPlay;
    if (enableAutoPlay) {
      interval = setInterval(incrementTurn, 10);
    } else clearInterval(interval);
  };

  const incrementTurn = () => {
    turn++;
    oppCurrentCard = oppDeck.shift();
    selfCurrentCard = selfDeck.shift();
    updateDecksAndStatus();
    checkIfGameOver();
  };

  const updateDecksAndStatus = () => {
    if (oppCurrentCard > selfCurrentCard) {
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
      setGameStatus("Battle LOST!");
      setGameText(
        `Cards ${oppCurrentCard} and ${selfCurrentCard}, and any cards at war are placed in the opponents' deck.`
      );
    } else if (oppCurrentCard < selfCurrentCard) {
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
      setGameStatus("Battle WON!");
      setGameText(
        `Cards ${oppCurrentCard} and ${selfCurrentCard}, and any cards at war are placed in your deck.`
      );
    } else if (
      oppDeck.length > 0 &&
      selfDeck.length > 0 &&
      oppCurrentCard === selfCurrentCard
    ) {
      oppCardsInBattle.push(oppCurrentCard);
      selfCardsInBattle.push(selfCurrentCard);
      battleCards++;
      console.log("war");
      setGameStatus("War!");
      setGameText("Pull another card to settle this battle, winner takes all.");
    } else if (
      (oppDeck.length === 0 || selfDeck.length === 0) &&
      oppCurrentCard === selfCurrentCard
    ) {
      oppRemainingCards =
        oppRemainingCards + battleCards + oppCardsInBattle.length;
      selfRemainingCards =
        selfRemainingCards + battleCards + selfCardsInBattle.length;
      battleCards = 0;
      oppCardsInBattle = [];
      selfCardsInBattle = [];
    }
  };

  const checkIfGameOver = () => {
    if (
      (oppCurrentCard > selfCurrentCard ||
        oppCurrentCard === selfCurrentCard) &&
      selfDeck.length <= 0
    ) {
      setGameStatus("You've LOST the war!");
      setGameText("Welp, now we're extinct.");
      disableButton();
      clearInterval(interval);
    } else if (
      (oppCurrentCard < selfCurrentCard ||
        oppCurrentCard === selfCurrentCard) &&
      oppDeck.length <= 0
    ) {
      setGameStatus("You've WON the war!");
      setGameText("Nice.");
      disableButton();
      clearInterval(interval);
    }
  };

  const reset = () => {
    turn = 0;
    setGameStatus("Start");
    setGameText("No prisoners.");
    oppDeck = [];
    selfDeck = [];
    oppCurrentCard = "";
    selfCurrentCard = "";
    battleCards = 0;
    oppCardsInBattle = [];
    selfCardsInBattle = [];
    disableButtonStatus = false;
    enableAutoPlay = false;
    clearInterval(interval);
    initShuffle();
  };

  const disableButton = () => {
    disableButtonStatus = true;
  };

  return (
    <GameWrapper>
      <OppSide>
        <CardPlaceholder>Cards remaining: {oppRemainingCards}</CardPlaceholder>
        <CardPlaceholder>{oppCurrentCard}</CardPlaceholder>
        <CardPlaceholder>
          <div>
            <div>
              Upside-down cards: <div>{battleCards}</div>
            </div>
            <div>
              Card(s) at war:
              {oppCardsInBattle.length > 0 ? (
                oppCardsInBattle.map((card) => <div key={card}> {card} </div>)
              ) : (
                <div>None</div>
              )}
            </div>
          </div>
        </CardPlaceholder>
      </OppSide>
      <GameFunctions>
        <GameFunctionsLeft>
          <Rounds>
            Round: {turn} Avg: {average}
          </Rounds>
        </GameFunctionsLeft>
        <GameFunctionsCentre>
          <GameStatus>{gameStatus}</GameStatus>
          <LineBreak />
          <GameText>{gameText}</GameText>
        </GameFunctionsCentre>
        <GameFunctionsRight>
          <NextButton onClick={incrementTurn} disabled={disableButtonStatus}>
            Next turn
          </NextButton>
          <AutoPlayButton
            onClick={toggleAutoPlay}
            disabled={disableButtonStatus}
          >
            Auto Play
          </AutoPlayButton>
          <ResetButton onClick={reset}>Reset</ResetButton>
        </GameFunctionsRight>
      </GameFunctions>
      <SelfSide>
        <CardPlaceholder>Cards remaining: {selfRemainingCards}</CardPlaceholder>
        <CardPlaceholder>{selfCurrentCard}</CardPlaceholder>
        <CardPlaceholder>
          <div>
            <div>
              Upside-down cards: <div>{battleCards}</div>
            </div>
            <div>
              Card(s) at war:
              {selfCardsInBattle.length > 0 ? (
                selfCardsInBattle.map((card) => <div key={card}> {card} </div>)
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
  align-items: center;
  justify-content: space-between;
`;

const GameFunctionsLeft = styled.div``;

const GameFunctionsCentre = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  text-align: center;
  width: 25%;
  height: 100%;
  /* font-size: 2vw; */
`;

const GameFunctionsRight = styled.div``;

const AutoPlayButton = styled.button``;

const NextButton = styled.button`
  margin-right: 3vw;
`;

const ResetButton = styled.button`
  margin: 0 3vw;
`;

const GameStatus = styled.p`
  color: ${COLORS.secondary};
  height: 40%;
  padding-top: 4%;
`;

const GameText = styled.p`
  display: flex;
  align-items: center;
  height: 60%;
  padding-bottom: 4%;
`;
const LineBreak = styled.div`
  width: 100%;
  height: 0px;
`;

const Rounds = styled.div`
  margin: 0 0 0 3vw;
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
  font-size: 24px;
`;

export default AgainstHouse;
