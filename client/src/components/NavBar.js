import React, { Component } from "react";
import { Link } from "react-router-dom";
// Material UI
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import WhatshotTwoToneIcon from "@material-ui/icons/WhatshotTwoTone";

class NavBar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar className="NavBar-container">
          <Box className="NavBar-stylebox"></Box>
          <Button
            startIcon={<WhatshotTwoToneIcon />}
            color="inherit"
            className="NavBar-title"
            component={Link}
            to="/home">
            Firegram
          </Button>
          <Box className="NavBar-btns" color="inherit">
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              component={Link}
              to="/home">
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<AccountBoxIcon />}
              component={Link}
              to="/profile">
              Profile
            </Button>
          </Box>

          <Button
            color="inherit"
            startIcon={<ExitToAppIcon />}
            className="NavBar-logout"
            component={Link}
              to="/">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
