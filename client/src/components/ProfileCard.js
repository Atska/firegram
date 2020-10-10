import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EditAccount from "./EditAccount";
// Styles
import styles from "./styles/ProfileStyles";
// Material UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
// Icon
import ImageIcon from "@material-ui/icons/Image";

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
      // reloads the window for updating pic || warning antipattern!
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
    const {
      classes,
      profile: {
        follows,
        followedBy,
        credentials: { handle, bio, photoURL, website }
      }
    } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent>
          {/* PROFILE PICTURE */}
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
            {/* USERNAME */}
            <Typography
              className={classes.username}
              variant="h4"
              color="primary"
              component="h2">
              {handle}
            </Typography>
          </Grid>
          <Grid>
            <Typography className={classes.website}>
              <Link href={website}>
                {website}
              </Link>
            </Typography>
          </Grid>
          {/* FOLLOWS */}
          <Grid>
            <CardActions>
              <Typography className={classes.abo}>
                {followedBy.length} Follower | {follows.length} follows
              </Typography>
            </CardActions>
          </Grid>
          {/* BIOGRAPHY */}
          <Grid>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.bio}>
              {bio}
            </Typography>
          </Grid>
        </CardContent>
        {/* BUTTONS */}
        <CardActions className={classes.edit}>
          {/* IMAGE UPLOAD BUTTON */}
          <Tooltip title="Edit profile picture" placement="bottom">
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
            </Button>
          </Tooltip>
          {/* UPDATE ACCOUNT BUTTON */}
          <EditAccount bio={bio} website={website} />
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(ProfileCard));
