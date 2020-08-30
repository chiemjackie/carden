import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CardFront from "../CardGraphics/CardFront";
import { COLORS, DECK } from "../../constants";

const OneCard = () => {
  const [oppCurrentCard, setOppCurrentCard] = useState("");
  const [selfCurrentCard, setSelfCurrentCard] = useState("");
  const [gameStatus, setGameStatus] = useState("START");
  const [gameText, setGameText] = useState("START");

  const deck = DECK;

  useEffect(() => {
    if (oppCurrentCard.value >= selfCurrentCard.value) {
      setGameStatus("Battle LOST!");
      setGameText("You lost your money and your pride.");
    } else if (oppCurrentCard.value < selfCurrentCard.value) {
      setGameStatus("Battle WON!");
      setGameText(`You've won your bet!`);
    }
  });

  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  }

  function playCard() {
    shuffleDeck();
    setOppCurrentCard(deck[0]);
    setSelfCurrentCard(deck[1]);
  }

  return (
    <GameWrapper>
      <OppSide>
        {/* {status === "loading" && <CircularProgress />} */}
        <CardFront card={oppCurrentCard} />
      </OppSide>
      <GameFunctions>
        <GameFunctionsLeft></GameFunctionsLeft>
        <GameFunctionsCentre>
          <GameStatus>{gameStatus}</GameStatus>
          <LineBreak />
          <GameText>{gameText}</GameText>
        </GameFunctionsCentre>
        <GameFunctionsRight>
          <NextButton onClick={playCard}>Next turn</NextButton>
        </GameFunctionsRight>
      </GameFunctions>
      <SelfSide>
        <CardFront card={selfCurrentCard} />
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
  justify-content: center;
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

const NextButton = styled.button`
  margin-right: 3vw;
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

export default OneCard;
