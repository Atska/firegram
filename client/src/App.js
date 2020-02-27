import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//routes
import Home from "./routes/Home";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Registration from "./routes/Registration";
//components
import NavBar from "./components/NavBar";
//Material UI
import Box from "@material-ui/core/Box";
//CSS
import "./components/NavBar.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar /> 
          <Box className="container">
            <Switch>
              <Route exact path="/" component={Registration} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Box>
        </Router>
      </div>
    );
  }
}

export default App;
