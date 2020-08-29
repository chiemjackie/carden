import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";

import JOHN from "../assets/john-d-macdonald.jpg";

const Profile = () => {
  return (
    <FooterWrapper>
      <Line />
      <QuoteWrapper>
        <AuthorImage src={JOHN} />
        <TextWrapper>
          <Quote>
            IF THE CARDS ARE STACKED AGAINST YOU, RESHUFFLE THE DECK.
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
  margin: 3vw;
  border: 1px solid lightgrey;
`;

const AuthorImage = styled.img`
  height: 20vh;
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
  max-width: 34vw;
  margin-left: 1%;
`;

const Quote = styled.div`
  font-size: 1.1em;
  font-style: italic;
  color: ${COLORS.secondary};
`;

const AuthorName = styled.div`
  margin: 10px 0;
  font-size: 0.9em;
`;

const InvisibleLineBreak = styled.div`
  width: 100%;
`;

export default Profile;
