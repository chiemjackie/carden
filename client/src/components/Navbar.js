import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import logo_and_carden from "../assets/logo_and_carden.png";

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
          <StyledLink to="/login">SIGN UP / LOGIN</StyledLink>
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
  margin: 15px;
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
  height: 60px;
`;

const StyledLink = styled(NavLink)`
  margin-left: 30px;
`;

export default Navbar;
