import React from "react";
import { BrowserRouter as Router, NavLink, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <NavLink to='/login'>Log In</NavLink>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path='/protected'>
            <BubblePage />
          </PrivateRoute>
          <Redirect exact from='/protected/reload' to='/protected' />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute