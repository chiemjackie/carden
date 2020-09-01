import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { COLORS } from "../constants";
import carden from "../assets/carden.png";
import wallpaper from "../assets/wallpaper.jpg";

const Homepage = () => {
  return (
    <HomepageWrapper>
      <Main>
        <MainElementContent>
          <StyledLogo src={carden} />
        </MainElementContent>
        <MainElementContent>
          where competition meets serenity
        </MainElementContent>
      </Main>
    </HomepageWrapper>
  );
};

const HomepageWrapper = styled.div`
  height: 77vh;
  background-size: cover;
  background-image: url(${wallpaper});
  background-position: center;
  background-repeat: "no-repeat";
`;

const Main = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-top: 8px;
  height: 100%;
`;

const StyledLogo = styled.img`
  height: 8rem;
`;

const MainElementContent = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  font-style: italic;
  padding-bottom: 48px;
  /* font-weight: bold; */
  font-family: "Playfair Display", serif;
  color: grey;
`;

export default Homepage;
