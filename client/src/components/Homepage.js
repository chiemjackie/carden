import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { COLORS } from "../constants";

const Homepage = () => {
  return (
    <HomepageWrapper>
      <HomepageElement>
        <HomepageElementContent>
          Love playing cards? Love playing games with friends? Maybe just have a
          gambling problem? You're in the right place.
        </HomepageElementContent>
      </HomepageElement>
      <HomepageLink to="/account">
        <HomepageLinkContent>
          Feeling rebellious? Play without an account!
        </HomepageLinkContent>
      </HomepageLink>
      <HomepageLink to="/account">
        <HomepageLinkContent>
          Not a complete loser? Set up an account, or login and play!
        </HomepageLinkContent>
      </HomepageLink>
    </HomepageWrapper>
  );
};

const HomepageWrapper = styled.div``;

const HomepageElement = styled.div`
  padding: 10px;
  background-color: ${COLORS.secondary};
  margin: 10px;
  color: white;
`;

const HomepageLink = styled(NavLink)``;

const HomepageElementContent = styled.p``;

const HomepageLinkContent = styled.p`
  padding: 10px;
  background-color: ${COLORS.tertiary};
  margin: 10px;
  color: white;
`;

export default Homepage;
