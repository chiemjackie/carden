import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import logo_and_carden from "../assets/logo_and_carden.png";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import { GiSunflower } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";

const Navbar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <NavbarWrapper>
      <NavLeftSection>
        <li>
          <NavLink to="/">
            <StyledLogo src={logo_and_carden} alt="logo" />
          </NavLink>
        </li>
        <NavItem>
          <StyledLink to="/play">PLAY</StyledLink>
        </NavItem>
      </NavLeftSection>
      <NavRightSection>
        {currentUser && (
          <NavItem>
            <StyledRose />
            <NumRoses>{currentUser.roses}</NumRoses>
            <StyledSunflower />
            <NumSunflowers>{currentUser.daisies}</NumSunflowers>
            <Username>{currentUser.username}</Username>
          </NavItem>
        )}
        {!currentUser && (
          <NavItem>
            <StyledLink to="/account">ACCOUNT</StyledLink>
          </NavItem>
        )}
        <NavItem>
          <StyledLink to="/profile">PLAYERS</StyledLink>
        </NavItem>
      </NavRightSection>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 5px 15px 30px;
  font-weight: bold;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  text-align: center;
`;

const NavLeftSection = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
`;

const NavRightSection = styled.div`
  display: flex;
  text-align: right;
`;

const StyledLogo = styled.img`
  margin-top: 5px;
  height: 60px;
`;

const StyledLink = styled(NavLink)`
  margin-left: 2vw;
  color: ${COLORS.secondary};
`;

const StyledRose = styled(IoIosRose)`
  color: ${COLORS.red};
  margin-right: 2%;
  font-size: 2rem;
`;

const StyledSunflower = styled(GiSunflower)`
  color: darkorange;
  margin-right: 2%;
  font-size: 2rem;
`;

const NumRoses = styled.div`
  color: ${COLORS.red};
  margin-right: 2vw;
`;
const NumSunflowers = styled.div`
  margin-right: 2vw;
  color: darkorange;
`;
const Username = styled.div`
  color: ${COLORS.primary};
  min-width: 8vw;
`;

export default Navbar;
