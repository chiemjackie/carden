import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import CardFront from "../CardGraphics/CardFront";
import { COLORS, DECK } from "../../constants";
import { CurrentUserContext } from "../CurrentUserContext";
import { GiSunflower } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";

const OneCard = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [gameStatus, setGameStatus] = useState("START");
  const [gameText, setGameText] = useState("START");
  const [oppCurrentCard, setOppCurrentCard] = useState("");
  const [selfCurrentCard, setSelfCurrentCard] = useState("");
  const [deck, setDeck] = useState(DECK);
  const [rosesBetInput, setRosesBetInput] = useState(0);
  const [sunflowersBetInput, setSunflowersBetInput] = useState(0);

  console.log(currentUser);

  let roses;
  let sunflowers;
  let username;
  let _id;

  useEffect(() => {
    // console.log("deck has changed");
  }, [deck]);

  if (currentUser) {
    roses = parseInt(currentUser.roses);
    sunflowers = parseInt(currentUser.sunflowers);
    username = currentUser.username;
    _id = currentUser._id;
  }

  function determineWinner() {
    let tempDeck = [...deck];

    for (let i = tempDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = tempDeck[i];
      tempDeck[i] = tempDeck[j];
      tempDeck[j] = temp;
    }

    setDeck(tempDeck);
    setOppCurrentCard(tempDeck[0]);
    setSelfCurrentCard(tempDeck[1]);

    console.log(
      "shuffle deck and playcard fuinction ran",
      oppCurrentCard,
      selfCurrentCard
    );
    if (tempDeck[0].value >= tempDeck[1].value) {
      // console.log("lost1111", rosesBetInput, sunflowersBetInput);
      setGameStatus("Battle LOST!");
      setGameText("You lost your pride as well as your money.");
      if (parseInt(rosesBetInput) > 0 || parseInt(sunflowersBetInput) > 0) {
        console.log("fetch call");
        setCurrentUser((prevstate) => {
          return {
            ...prevstate,
            roses: roses - parseInt(rosesBetInput),
            sunflowers: sunflowers - parseInt(sunflowersBetInput),
          };
        });
        fetch("/account/flowers", {
          method: `put`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: _id,
            roses: roses - parseInt(rosesBetInput),
            sunflowers: sunflowers - parseInt(sunflowersBetInput),
          }),
        }).then((res) => res.text());
      } else if (tempDeck[0].value < tempDeck[1].value) {
        setGameStatus("Battle WON!");
        setGameText(`Congratulations, but you're still a loser.`);
        if (parseInt(rosesBetInput) > 0 || parseInt(sunflowersBetInput) > 0) {
          console.log("win");
        }
      }
    }
  }

  function setBet() {
    if (rosesBetInput && roses >= rosesBetInput) {
      setGameStatus("Bet added!");
      setGameText(
        `Your bet is now ${rosesBetInput} Rose(s) and ${sunflowersBetInput} Sunflower(s).`
      );
    }

    if (sunflowersBetInput && sunflowers >= sunflowersBetInput) {
      setGameStatus("Bet added!");
      setGameText(
        `Your bet is now ${rosesBetInput} Rose(s) and ${sunflowersBetInput} Sunflower(s).`
      );
    }

    if (
      (rosesBetInput && roses < rosesBetInput) ||
      (sunflowersBetInput && sunflowers < sunflowersBetInput)
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
              <NumRoses>{roses}</NumRoses>
              <NumRosesBet>{rosesBetInput}</NumRosesBet>
              <RosesInput
                name="roses"
                id="roses"
                type="text"
                placeholder="Roses bet"
                value={rosesBetInput}
                onChange={(event) => {
                  setRosesBetInput(event.target.value);
                }}
              ></RosesInput>
              <StyledSunflower />
              <NumSunflowers>{sunflowers}</NumSunflowers>
              <NumSunflowersBet>{sunflowersBetInput}</NumSunflowersBet>
              <SunflowersInput
                name="sunflowers"
                id="sunflowers"
                type="text"
                placeholder="Sunflowers bet"
                value={sunflowersBetInput}
                onChange={(event) => {
                  setSunflowersBetInput(event.target.value);
                }}
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
