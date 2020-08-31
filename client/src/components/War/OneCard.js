import React, { useState, useContext } from "react";
import styled from "styled-components";

import CardFront from "../CardGraphics/CardFront";
import { COLORS, DECK } from "../../constants";
import { CurrentUserContext } from "../CurrentUserContext";
import { GiSunflower } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";

const deck = DECK;

// let oppCurrentCard = "";
// let selfCurrentCard = "";
// let rosesBet = 0;
// let sunflowersBet = 0;

const OneCard = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [gameStatus, setGameStatus] = useState("START");
  const [gameText, setGameText] = useState("START");
  const [oppCurrentCard, setOppCurrentCard] = useState("");
  const [selfCurrentCard, setSelfCurrentCard] = useState("");
  const [rosesBet, setRosesBet] = useState(0);
  const [sunflowersBet, setSunflowersBet] = useState(0);

  const { roses, sunflowers, username, _id } = currentUser;

  const rosesInt = parseInt(roses);
  const sunflowersInt = parseInt(sunflowers);

  async function determineWinner() {
    await shuffleDeck();
    await playCard();

    if (oppCurrentCard.value >= selfCurrentCard.value) {
      setGameStatus("Battle LOST!");
      setGameText("You lost your pride as well as your money.");
      if (rosesBet > 0 || sunflowersBet > 0) {
        fetch("/account/flowers", {
          method: `patch`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: _id,
            roses: roses - rosesBet,
            sunflowers: sunflowers - sunflowersBet,
          }),
        });
        console.log("lost");
      }
    } else if (oppCurrentCard.value < selfCurrentCard.value) {
      setGameStatus("Battle WON!");
      setGameText(`Congratulations, but you're still a loser.`);
      if (rosesBet > 0 || sunflowersBet > 0) {
        // fetch("/account/flowers", {
        //   method: `patch`,
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     _id: _id,
        //     roses: roses + rosesBet,
        //     sunflowers: sunflowers + sunflowersBet,
        //   }),
        // })
        //   .then((response) => response.json())
        //   .then((json) => console.log(json));
        console.log("won");
      }
    }
  }

  async function playCard() {
    setOppCurrentCard(deck[0]);
    setSelfCurrentCard(deck[1]);
    // oppCurrentCard = deck[0];
    // selfCurrentCard = deck[1];
  }

  async function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  }

  function setBet() {
    let rosesBetInput = parseInt(document.getElementById("roses").value);
    let sunflowersBetInput = parseInt(
      document.getElementById("sunflowers").value
    );

    if (rosesBetInput && rosesInt >= rosesBetInput) {
      setRosesBet(rosesBetInput);
      // rosesBet = rosesBetInput;
      setGameStatus("Bet added!");
      setGameText(
        `Your bet is now ${rosesBet} Rose(s) and ${sunflowersBet} Sunflower(s).`
      );
    }

    if (sunflowersBetInput && sunflowersInt >= sunflowersBetInput) {
      setSunflowersBet(sunflowersBetInput);
      // sunflowersBet = sunflowersBetInput;
      setGameStatus("Bet added!");
      setGameText(
        `Your bet is now ${rosesBet} Rose(s) and ${sunflowersBet} Sunflower(s).`
      );
    }

    if (
      (rosesBetInput && rosesInt < rosesBetInput) ||
      (sunflowersBetInput && sunflowersInt < sunflowersBetInput)
    ) {
      setGameStatus("Insufficient flowers!");
      setGameText("Decrease your bet to play.");
    }

    if (!rosesBetInput && !sunflowersBetInput) {
      setGameStatus("No bet added!");
      setGameText("Playing with previous bet.");
    }
  }

  return (
    <GameWrapper>
      <OppSide>
        <CardFront card={oppCurrentCard} />
      </OppSide>
      <GameFunctions>
        <GameFunctionsLeft>
          {currentUser && (
            <>
              <StyledRose />
              <NumRoses>{rosesInt}</NumRoses>
              <NumRosesBet>{rosesBet}</NumRosesBet>
              <RosesInput
                name="roses"
                id="roses"
                type="text"
                placeholder="Roses bet"
              ></RosesInput>
              <StyledSunflower />
              <NumSunflowers>{sunflowersInt}</NumSunflowers>
              <NumSunflowersBet>{sunflowersBet}</NumSunflowersBet>
              <SunflowersInput
                name="sunflowers"
                id="sunflowers"
                type="text"
                placeholder="Sunflowers bet"
              ></SunflowersInput>
              <BetButton onClick={setBet}>Confirm</BetButton>
            </>
          )}
        </GameFunctionsLeft>
        <GameFunctionsCentre>
          <GameStatus>{gameStatus}</GameStatus>
          <LineBreak />
          <GameText>{gameText}</GameText>
        </GameFunctionsCentre>
        <GameFunctionsRight>
          <PlayButton onClick={determineWinner}>Play</PlayButton>
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

const GameFunctionsLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NumRoses = styled.div`
  color: ${COLORS.red};
  margin-right: 1vw;
`;
const NumSunflowers = styled.div`
  margin-right: 1vw;
  color: ${COLORS.orange};
`;

const StyledRose = styled(IoIosRose)`
  color: ${COLORS.red};
  margin-right: 0.5vw;
  font-size: 2rem;
`;

const StyledSunflower = styled(GiSunflower)`
  color: ${COLORS.orange};
  margin-right: 0.5vw;
  font-size: 2.2rem;
`;

const NumRosesBet = styled.div`
  color: ${COLORS.blue};
  margin-right: 0.5vw;
`;

const NumSunflowersBet = styled.div`
  color: ${COLORS.blue};
  margin-right: 0.5vw;
`;

const RosesInput = styled.input`
  margin-right: 1vw;
  width: calc(60px + 3vw);
`;

const SunflowersInput = styled.input`
  width: calc(60px + 3vw);
`;

const BetButton = styled.button`
  margin-left: 2vw;
`;

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

const PlayButton = styled.button`
  margin-right: 3vw;
`;

export default OneCard;
