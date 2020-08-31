import React from "react";
import styled from "styled-components";

import Login from "./Login";
import Signup from "./Signup";
import Guest from "./Guest";

const Account = () => {
  return (
    <AccountWrapper>
      <Signup />
      <Line />
      <Login />
      <Line />
      <Guest />
    </AccountWrapper>
  );
};

const AccountWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
`;

const Line = styled.hr`
  width: 90vw;
  border: 1px solid lightgrey;
  margin: 4vh 4vh 3vh;
`;

export default Account;
