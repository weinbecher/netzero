import React, {Fragment} from 'react';
import HomeContainer from "./containers/HomeContainer";
import UserContainer from "./components/UserCompontent"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default function MainContainer() {
  return(
  <Router>
          <Fragment>

    <Routes>
        <Route path="/login" exact component={UserContainer}/>
        <Route to="/" component ={HomeContainer}></Route>
    </Routes>
    </Fragment>

   </Router>
  )};
export default App;
