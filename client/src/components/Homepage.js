import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// import { COLORS } from "../constants";

const Homepage = () => {
  return (
    <HomepageWrapper>
      <HomepageElement>
        <HomepageElementContent>
          Love playing cards? Love playing games with friends? Maybe just have a
          gambling problem? You're in the right place.
        </HomepageElementContent>
      </HomepageElement>
      <HomepageLink to="/guest">
        <HomepageElementContent>
          I don't need an account, let's just play!
        </HomepageElementContent>
      </HomepageLink>
      <HomepageLink to="/account">
        <HomepageElementContent>
          I want to set up an account, or I already have one - let's go play!
        </HomepageElementContent>
      </HomepageLink>
    </HomepageWrapper>
  );
};

const HomepageWrapper = styled.div``;

const HomepageElement = styled.div``;

const HomepageLink = styled(NavLink)``;

const HomepageElementContent = styled.div`
  padding: 10px;
  background-color: lightblue;
  margin: 10px;
`;

export default Homepage;
