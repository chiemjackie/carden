import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./components/Globalstyles";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import GameSelector from "./components/GameSelector";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/game/:gameId">
            <GameSelector />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
