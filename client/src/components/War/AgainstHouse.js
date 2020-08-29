import React, { useState } from "react";
import styled from "styled-components";

import CardFront from "../CardGraphics/CardFront";
import CardBack from "../CardGraphics/CardBack";
import { COLORS } from "../../constants";

const startingDeck = [
  {
    value: 2,
    rank: "2",
    suit: "spade",
    color: "black",
  },
  {
    value: 2,
    rank: "2",
    suit: "club",
    color: "black",
  },
  {
    value: 2,
    rank: "2",
    suit: "diamond",
    color: "red",
  },
  {
    value: 2,
    rank: "2",
    suit: "heart",
    color: "red",
  },
  {
    value: 3,
    rank: "3",
    suit: "spade",
    color: "black",
  },
  {
    value: 3,
    rank: "3",
    suit: "club",
    color: "black",
  },
  {
    value: 3,
    rank: "3",
    suit: "diamond",
    color: "red",
  },
  {
    value: 3,
    rank: "3",
    suit: "heart",
    color: "red",
  },
  {
    value: 4,
    rank: "4",
    suit: "spade",
    color: "black",
  },
  {
    value: 4,
    rank: "4",
    suit: "club",
    color: "black",
  },
  {
    value: 4,
    rank: "4",
    suit: "diamond",
    color: "red",
  },
  {
    value: 4,
    rank: "4",
    suit: "heart",
    color: "red",
  },
  {
    value: 5,
    rank: "5",
    suit: "spade",
    color: "black",
  },
  {
    value: 5,
    rank: "5",
    suit: "club",
    color: "black",
  },
  {
    value: 5,
    rank: "5",
    suit: "diamond",
    color: "red",
  },
  {
    value: 5,
    rank: "5",
    suit: "heart",
    color: "red",
  },
  {
    value: 6,
    rank: "6",
    suit: "spade",
    color: "black",
  },
  {
    value: 6,
    rank: "6",
    suit: "club",
    color: "black",
  },
  {
    value: 6,
    rank: "6",
    suit: "diamond",
    color: "red",
  },
  {
    value: 6,
    rank: "6",
    suit: "heart",
    color: "red",
  },
  {
    value: 7,
    rank: "7",
    suit: "spade",
    color: "black",
  },
  {
    value: 7,
    rank: "7",
    suit: "club",
    color: "black",
  },
  {
    value: 7,
    rank: "7",
    suit: "diamond",
    color: "red",
  },
  {
    value: 7,
    rank: "7",
    suit: "heart",
    color: "red",
  },
  {
    value: 8,
    rank: "8",
    suit: "spade",
    color: "black",
  },
  {
    value: 8,
    rank: "8",
    suit: "club",
    color: "black",
  },
  {
    value: 8,
    rank: "8",
    suit: "diamond",
    color: "red",
  },
  {
    value: 8,
    rank: "8",
    suit: "heart",
    color: "red",
  },
  {
    value: 9,
    rank: "9",
    suit: "spade",
    color: "black",
  },
  {
    value: 9,
    rank: "9",
    suit: "club",
    color: "black",
  },
  {
    value: 9,
    rank: "9",
    suit: "diamond",
    color: "red",
  },
  {
    value: 9,
    rank: "9",
    suit: "heart",
    color: "red",
  },
  {
    value: 10,
    rank: "10",
    suit: "spade",
    color: "black",
  },
  {
    value: 10,
    rank: "10",
    suit: "club",
    color: "black",
  },
  {
    value: 10,
    rank: "10",
    suit: "diamond",
    color: "red",
  },
  {
    value: 10,
    rank: "10",
    suit: "heart",
    color: "red",
  },
  {
    value: 11,
    rank: "J",
    suit: "spade",
    color: "black",
  },
  {
    value: 11,
    rank: "J",
    suit: "club",
    color: "black",
  },
  {
    value: 11,
    rank: "J",
    suit: "diamond",
    color: "red",
  },
  {
    value: 11,
    rank: "J",
    suit: "heart",
    color: "red",
  },
  {
    value: 12,
    rank: "Q",
    suit: "spade",
    color: "black",
  },
  {
    value: 12,
    rank: "Q",
    suit: "club",
    color: "black",
  },
  {
    value: 12,
    rank: "Q",
    suit: "diamond",
    color: "red",
  },
  {
    value: 12,
    rank: "Q",
    suit: "heart",
    color: "red",
  },
  {
    value: 13,
    rank: "K",
    suit: "spade",
    color: "black",
  },
  {
    value: 13,
    rank: "K",
    suit: "club",
    color: "black",
  },
  {
    value: 13,
    rank: "K",
    suit: "diamond",
    color: "red",
  },
  {
    value: 13,
    rank: "K",
    suit: "heart",
    color: "red",
  },
  {
    value: 14,
    rank: "A",
    suit: "spade",
    color: "black",
  },
  {
    value: 14,
    rank: "A",
    suit: "club",
    color: "black",
  },
  {
    value: 14,
    rank: "A",
    suit: "diamond",
    color: "red",
  },
  {
    value: 14,
    rank: "A",
    suit: "heart",
    color: "red",
  },
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
  const [gameStatus, setGameStatus] = useState("Commence the war!");
  const [gameText, setGameText] = useState("No prisoners.");

  let oppRemainingCards = oppDeck.length - battleCards;
  let selfRemainingCards = selfDeck.length - battleCards;
  // let average = (selfDeck.length + oppDeck.length + 2 * battleCards) / 2;

  function toggleAutoPlay() {
    enableAutoPlay = !enableAutoPlay;
    if (enableAutoPlay) {
      interval = setInterval(incrementTurn, 10);
    } else clearInterval(interval);
  }

  function incrementTurn() {
    turn++;
    oppCurrentCard = oppDeck.shift();
    selfCurrentCard = selfDeck.shift();
    updateDecksAndStatus();
    checkIfGameOver();
  }

  function updateDecksAndStatus() {
    if (oppCurrentCard.value > selfCurrentCard.value) {
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
        `Cards ${oppCurrentCard.rank} and ${selfCurrentCard.rank}, and any cards at war are placed in the opponents' deck.`
      );
    } else if (oppCurrentCard.value < selfCurrentCard.value) {
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
        `Cards ${oppCurrentCard.rank} and ${selfCurrentCard.rank}, and any cards at war are placed in your deck.`
      );
    } else if (
      oppDeck.length > 0 &&
      selfDeck.length > 0 &&
      oppCurrentCard.value === selfCurrentCard.value
    ) {
      oppCardsInBattle.push(oppCurrentCard);
      selfCardsInBattle.push(selfCurrentCard);
      battleCards++;
      setGameStatus("War!");
      setGameText("Pull another card to settle this battle, winner takes all.");
    } else if (
      (oppDeck.length === 0 || selfDeck.length === 0) &&
      oppCurrentCard.value === selfCurrentCard.value
    ) {
      oppRemainingCards = oppRemainingCards + battleCards;
      selfRemainingCards = selfRemainingCards + battleCards;
      battleCards = 0;
      oppCardsInBattle = [];
      selfCardsInBattle = [];
    }
  }

  function checkIfGameOver() {
    if (
      (oppCurrentCard.value > selfCurrentCard.value ||
        oppCurrentCard.value === selfCurrentCard.value) &&
      selfDeck.length <= 0
    ) {
      disableButton();
      clearInterval(interval);
      setGameStatus("You've LOST the war!");
      setGameText("Welp, now we're extinct.");
    } else if (
      (oppCurrentCard.value < selfCurrentCard.value ||
        oppCurrentCard.value === selfCurrentCard.value) &&
      oppDeck.length <= 0
    ) {
      disableButton();
      clearInterval(interval);
      setGameStatus("You've WON the war!");
      setGameText("Nice.");
    }
  }

  function reset() {
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
  }

  function disableButton() {
    disableButtonStatus = true;
  }

  // console.log("OPP", oppDeck);
  // console.log("SELF", selfDeck);

  return (
    <GameWrapper>
      <OppSide>
        <CardBack remainingCards={oppRemainingCards} />
        <CardFront card={oppCurrentCard} />
        <CardBack battleCards={battleCards} cardsInBattle={oppCardsInBattle} />
      </OppSide>
      <GameFunctions>
        <GameFunctionsLeft>
          <Rounds>
            Round: {turn}
            {/* Avg: {average} */}
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
        <CardBack remainingCards={selfRemainingCards} />
        <CardFront card={selfCurrentCard} />
        <CardBack battleCards={battleCards} cardsInBattle={selfCardsInBattle} />
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

export default AgainstHouse;
