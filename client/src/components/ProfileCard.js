import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Styles
import styles from "./styles/ProfileStyles";
// Material UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
// Icon
import ImageIcon from "@material-ui/icons/Image";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

class ProfileCard extends Component {
  handleUpdatePicture = async event => {
    event.preventDefault();
    const image = event.target.files[0];
    let data = new FormData();
    data.append("image", image);
    try {
      const jwtToken = localStorage.token;
      const options = {
        method: "POST",
        headers: {
          Authorization: jwtToken
        },
        body: data
      };
      await fetch("/uploadProfilePicture", options);
      // reloads the window for updating pic
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = () => {
    const pictureUpload = document.getElementById("profilePicture");
    pictureUpload.click();
  };

  render() {
    // <img className={classes.media} src={photoURL} alt="new" />
    // user: {likes, notifications, follows, followedBy,
    // credentials: {handle, email, photoURL, time, userId}}
    const {
      classes,
      profile: {
        follows,
        followedBy,
        credentials: { handle, bio, photoURL }
      }
    } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          <Grid>
            <CardMedia
              className={classes.media}
              component="img"
              alt="Profile Picture"
              src={photoURL}
              title="Profile Picture"
            />
          </Grid>
          <Grid>
            <Typography
              className={classes.username}
              variant="h4"
              component="h2">
              @{handle}
            </Typography>
          </Grid>
          <CardActions>
            <Typography className={classes.abo}>
              {followedBy.length} Follower | {follows.length} follows
            </Typography>
          </CardActions>
          <Grid>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.bio}>
              {bio} Lizards are a widespread group of squamate reptiles, with
              over 6,000 species, ranging across all continents except
              Antarctica
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            component="label"
            size="small"
            type="file"
            color="primary"
            startIcon={<ImageIcon />}
            onChange={this.handleUpdatePicture}>
            <input
              type="file"
              id="profilePicture"
              style={{ display: "none" }}
              onClick={this.handleClick}
            />
            Edit Picture
          </Button>
          <Button size="small" color="primary" startIcon={<AccountBoxIcon />}>
            Edit Account
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(ProfileCard));
