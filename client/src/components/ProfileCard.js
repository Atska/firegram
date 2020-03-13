import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Material UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icon
import ImageIcon from "@material-ui/icons/Image";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const styles = {
  root: {
    maxWidth: "20%",
    minWidth: "20%"
  },
  username: {
    textAlign: "center",
    borderTop: "1px solid #D7D7D7",
    padding: "5%"
  },
  content: {
    display: "flex"
  },
  media: {
    maxWidth: "100%",
    minWidth: "100%",
    alignItems: "center"
  },
  header: {
    fontSize: 25,
    borderBottom: "1px solid #D7D7D7",
    margin: "normal"
  },
  abo: {
    padding: "0"
  },
  button: {
    maxWidth: "20%",
    minWidth: "20%",
    alignItems: "center"
  }
};

class ProfileCard extends Component {
  constructor() {
    super();
    // throws error otherwise because you cannot destructe undefined
    this.state = {
      user: {
        likes: [],
        follows: [],
        followedBy: [],
        credentials: {
          handle: "",
          photoURL: "",
          bio: ""
        }
      }
    };
  }

  async componentDidMount() {
    try {
      const jwtToken = localStorage.token;
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: jwtToken
        }
      };
      const response = await fetch("/user", options);
      const data = await response.json();
      this.setState({ user: data });
    } catch (error) {
      console.log(error);
    }
  }

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
      user: {
        likes,
        notifications,
        follows,
        followedBy,
        credentials: { handle, photoURL, bio }
      }
    } = this.state;
    const { classes } = this.props;

    // when picture loads slowly => add loading circle
    const ProfilePicture = photoURL ? (
      <CardMedia
        className={classes.media}
        component="img"
        alt="Profile Picture"
        src={photoURL}
        title="Profile Picture"
      />
    ) : (
      <CircularProgress />
    );

    return (
      <Card className={classes.root}>
        <CardContent>
          <Grid>{ProfilePicture}</Grid>
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
