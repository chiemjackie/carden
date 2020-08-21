import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import logo_and_carden from "../assets/logo_and_carden.png";
import { COLORS } from "../constants";

const Navbar = () => {
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
        <NavItem>
          <StyledLink to="/login">ACCOUNT</StyledLink>
        </NavItem>
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
`;

const NavItem = styled.li``;

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
  margin-left: 50px;
  font-weight: bold;
  color: ${COLORS.secondary};
`;

export default Navbar;
