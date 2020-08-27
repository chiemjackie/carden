import React from "react";
import styled from "styled-components";

import Login from "./Login";
import Signup from "./Signup";

const Account = () => {
  return (
    <AccountWrapper>
      <Signup />
      <Line />
      <Login />
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
  margin: 5vw;
`;

export default Account;
