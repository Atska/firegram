import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Utils
import styles from "../utils/styles";
// Images
import login from "../static/login.png";
// Material UI
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      redirectToReferrer: false
    };
    this.props = props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    };

    const response = await fetch("/signIn", options);
    if (response.status === 500) {
      const data = await response.json();
      console.log(data.error);
      this.setState({ errors: data.error });
    } else {
      const content = await response.json();
      localStorage.setItem("token", `Bearer ${content.token}`);
      // this.props.history.push("/home");
      this.setState({ redirectToReferrer: true });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <Card className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "50vh" }}>
          {/* HEADER */}
          <CardHeader
            title={<Typography className={classes.header}>Login</Typography>}
          />
          {/* PICTURE */}
          <Grid>
            <CardMedia
              className={classes.media}
              component="img"
              alt="Login"
              src={login}
              title="Login"
            />
          </Grid>
          {/* FORM */}
          <CardContent className={classes.content}>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                label="Email"
                name="email"
                type="text"
                variant="filled"
                size="small"
                helperText={errors.message}
                error={errors.message ? true : false}
                className={classes.textfields}
                className={classes.textfields}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                margin="normal"
                size="small"
                variant="filled"
                className={classes.textfields}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              {/* Button */}
              <Grid>
                <Box display="flex" justifyContent="center" marginTop="8%">
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    justify="center">
                    Login
                  </Button>
                </Box>
              </Grid>
            </form>
          </CardContent>
        </Grid>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(LoginCard));
