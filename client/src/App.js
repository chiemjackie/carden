import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./components/Globalstyles";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import OneCard from "./components/War/OneCard";
import FullDeck from "./components/War/FullDeck";
import GoFish from "./components/GoFish/GoFish";
import GameSelector from "./components/GameSelector";
import Account from "./components/AccountPage/AccountPage";
import ProfileSearch from "./components/ProfileSearch";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

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
          <Route exact path="/play">
            <GameSelector />
          </Route>
          <Route exact path="/play/war/onecard">
            <OneCard />
          </Route>
          <Route exact path="/play/war/fulldeck">
            <FullDeck />
          </Route>
          <Route exact path="/play/gofish">
            <GoFish />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/profile">
            <ProfileSearch />
          </Route>
          <Route exact path="/profile/:profileId">
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
