import React, { Component } from "react";
import theme from "./utils/theme";
// import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//routes
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import LoginRegistration from "./routes/LoginRegistration";
//components
import NavBar from "./components/NavBar";
import LoginCard from "./components/LoginCard";
import RegistrationCard from "./components/RegistrationCard";
//Material UI
import Box from "@material-ui/core/Box";
import { ThemeProvider } from "@material-ui/core/styles";
import PrivateRoute from "./utils/PrivateRoute";
//CSS
import "./components/NavBar.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <NavBar />
            <Box className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <LoginRegistration {...props} />}
                />
                <PrivateRoute
                  path="/home"
                  component={Home}
                />
                <PrivateRoute
                  exact
                  path="/profile"
                  component={Profile}
                />
                <Route exact path="/" component={LoginCard} />
                <Route
                  exact
                  path="/registration"
                  component={RegistrationCard}
                />
              </Switch>
            </Box>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
