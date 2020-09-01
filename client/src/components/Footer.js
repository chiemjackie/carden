import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";

const Profile = () => {
  return (
    <FooterWrapper>
      <Line />
      <QuoteWrapper>
        <TextWrapper>
          <Quote>
            If the cards are stacked against you, reshuffle the deck.
          </Quote>
          <InvisibleLineBreak />
          <AuthorName>JOHN D. MACDONALD</AuthorName>
        </TextWrapper>
      </QuoteWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  justify-content: center;
  align-items: center;
`;

const Line = styled.hr`
  width: 90vw;
  margin: 3vh 5vw;
  border: 1px solid lightgrey;
`;

const QuoteWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  margin-left: 1%;
`;

const Quote = styled.div`
  font-size: 1.1em;
  font-style: italic;
  color: ${COLORS.secondary};
  font-weight: bold;
  font-family: "Playfair Display", serif;
`;

const AuthorName = styled.div`
  margin: 10px 0;
  font-size: 0.9em;
  font-weight: bold;
  font-family: "Playfair Display", serif;
`;

const InvisibleLineBreak = styled.div`
  width: 100%;
`;

export default Profile;
