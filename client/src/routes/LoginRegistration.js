import React, { Component } from "react";
//components
import LoginCard from "../components/LoginCard";
import RegistrationCard from "../components/RegistrationCard";
// Material Ui
import Grid from "@material-ui/core/Grid";

class LoginRegistration extends Component {
  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={7}>
        <Grid item>
          <LoginCard />
        </Grid>
        <Grid item>
          <RegistrationCard />
        </Grid>
      </Grid>
    );
  }
}

export default LoginRegistration;
