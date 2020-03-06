import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Utils
import styles from "../utils/styles";
// Images
import Registration from "../static/Registration.png";
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

class RegistrationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();

    let newUser = {
      email: this.state.email,
      handle: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    };

    const response = await fetch("/signUp", options);
    if (response.status === 201) {
      const content = await response.json();
      localStorage.setItem("token", `Bearer ${content.token}`);
      this.props.history.push("/home");
    } else {
      const data = await response.json();
      this.setState({ errors: data });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

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
            title={
              <Typography className={classes.header}>Registration</Typography>
            }
          />
          <Grid>
          {/* PICTURE */}
            <CardMedia
              className={classes.media}
              component="img"
              alt="Registration"
              src={Registration}
              title="Registration"
            />
          </Grid>
          {/* FORM */}
          <CardContent className={classes.content}>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                label="Username"
                name="username"
                type="text"
                variant="filled"
                margin="dense"
                size="small"
                helperText={errors.handle}
                error={errors.handle ? true : false}
                className={classes.textfields}
                value={this.state.username}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                type="text"
                name="email"
                margin="normal"
                size="small"
                variant="filled"
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
                helperText={errors.error}
                error={errors.password || errors.error ? true : false}
                className={classes.textfields}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                margin="normal"
                size="small"
                variant="filled"
                helperText={errors.password || errors.confirmPassword}
                error={errors.password || errors.confirmPassword ? true : false}
                className={classes.textfields}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
              />
              {/* BUTTON */}
              <Grid>
                <Box display="flex" justifyContent="center" marginTop="5%">
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    justify="center">
                    Register
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

export default withRouter(withStyles(styles)(RegistrationCard));
