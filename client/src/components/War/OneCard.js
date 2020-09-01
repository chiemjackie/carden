import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import CardFront from "../CardGraphics/CardFront";
import { COLORS, DECK } from "../../constants";
import { CurrentUserContext } from "../CurrentUserContext";
import { GiSunflower } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";
import warWallpaper from "../../assets/war_wallpaper.jpg";

const OneCard = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [gameStatus, setGameStatus] = useState("START");
  const [gameText, setGameText] = useState("START");
  const [oppCurrentCard, setOppCurrentCard] = useState("");
  const [selfCurrentCard, setSelfCurrentCard] = useState("");
  const [deck, setDeck] = useState(DECK);
  const [rosesBetInput, setRosesBetInput] = useState(0);
  const [sunflowersBetInput, setSunflowersBetInput] = useState(0);
  const [colorStatus, setColorStatus] = useState(null);

  let roses;
  let sunflowers;
  let _id;

  useEffect(() => {}, [deck]);

  if (currentUser) {
    roses = parseInt(currentUser.roses);
    sunflowers = parseInt(currentUser.sunflowers);
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

    console.log(tempDeck[0], tempDeck[1]);
    setDeck(tempDeck);
    setOppCurrentCard(tempDeck[0]);
    setSelfCurrentCard(tempDeck[1]);

    if (parseInt(tempDeck[0].value) >= parseInt(tempDeck[1].value)) {
      setColorStatus("lost");
      setGameStatus("Battle LOST!");
      setGameText("You lost your pride as well as your money.");
      if (parseInt(rosesBetInput) > 0 || parseInt(sunflowersBetInput) > 0) {
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
      }
    } else if (parseInt(tempDeck[0].value) < parseInt(tempDeck[1].value)) {
      setColorStatus("won");
      setGameStatus("Battle WON!");
      setGameText(`Congratulations, but you're still a loser.`);
      if (parseInt(rosesBetInput) > 0 || parseInt(sunflowersBetInput) > 0) {
        setCurrentUser((prevstate) => {
          return {
            ...prevstate,
            roses: roses + parseInt(rosesBetInput),
            sunflowers: sunflowers + parseInt(sunflowersBetInput),
          };
        });
        fetch("/account/flowers", {
          method: `put`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: _id,
            roses: roses + parseInt(rosesBetInput),
            sunflowers: sunflowers + parseInt(sunflowersBetInput),
          }),
        }).then((res) => res.text());
      }
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
            </>
          )}
        </GameFunctionsLeft>
        <GameFunctionsCentre>
          {colorStatus === "won" && <GameStatusWon>{gameStatus}</GameStatusWon>}
          {colorStatus === "lost" && (
            <GameStatusLost>{gameStatus}</GameStatusLost>
          )}
          {!colorStatus && <GameStatusStart>{gameStatus}</GameStatusStart>}
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
  background-size: cover;
  background-image: url(${warWallpaper});
  background-position: center;
  margin: 5px auto;
  height: 77vh;
`;

const OppSide = styled.section`
  display: flex;
  height: 44%;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
`;

const SelfSide = styled.section`
  display: flex;
  height: 44%;
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
  justify-content: center;
  margin-left: 10vw;
  width: 20vw;
`;

const StyledRose = styled(IoIosRose)`
  color: ${COLORS.red};
  margin-right: 0.5vw;
  font-size: 42px;
  text-shadow: #000 0px 0px 3px;
`;

const NumRoses = styled.div`
  color: ${COLORS.red};
  margin-right: 1vw;
  text-shadow: #000 0px 0px 3px;
`;

const StyledSunflower = styled(GiSunflower)`
  color: ${COLORS.orange};
  margin-right: 0.5vw;
  font-size: 48px;
`;

const NumSunflowers = styled.div`
  margin-right: 1vw;
  color: ${COLORS.orange};
  text-shadow: #000 0px 0px 3px;
`;

const RosesInput = styled.input`
  margin-right: 1vw;
  width: calc(50px);
`;

const SunflowersInput = styled.input`
  width: calc(50px);
`;

const GameFunctionsCentre = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  text-align: center;
  width: 40vw;
  height: 100%;
  margin: 0 10px;
`;

const GameStatusWon = styled.p`
  color: green;
  height: 40%;
  padding-top: 2%;
`;

const GameStatusLost = styled.p`
  color: red;
  height: 40%;
  padding-top: 2%;
`;

const GameStatusStart = styled.p`
  color: blue;
  height: 40%;
  padding-top: 2%;
`;

const GameText = styled.p`
  display: flex;
  align-items: center;
  height: 60%;
`;

const LineBreak = styled.div`
  width: 100%;
  height: 0px;
`;

const GameFunctionsRight = styled.div`
  width: 30vw;
`;

const PlayButton = styled.button`
  font-family: "Playfair Display", serif;
  padding: 5px 10px;
  background-color: red;
  color: white;
`;

export default OneCard;
