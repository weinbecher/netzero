import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./HomeContainer";
import UserCompontent from "../components/UserCompontent";

export default function MainContainer() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/user" component={UserCompontent} />
          <Route path="/" component={HomeContainer} />
        </Switch>
      </div>
    </Router>
  );
}
