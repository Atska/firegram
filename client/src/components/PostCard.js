import React, { Component } from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
//utils
import styles from "./styles/PostStyles";
// Material UI
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
// Icons
import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import dayjs from "dayjs";

class PostCard extends Component {
  render() {
    //destructering: const classes = this.props.classes
    const {
      classes,
      post: { message, handle, time, photoURL, likes, comments }
    } = this.props;
    //format ISO-string time to relative time
    dayjs.extend(relativeTime);

    return (
      <Card className={classes.root}>
        {/* HEADER */}
        <CardHeader
          className={classes.header}
          avatar={<Avatar src={photoURL} />}
          title={
            <Typography color="inherit" component={Link} to={`/user/${handle}`}>
              {handle}
            </Typography>
          }
          subheader={dayjs(time).fromNow()}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        {/* PICTURE */}
        <CardMedia></CardMedia>
        {/* MESSAGE */}
        <CardContent className={classes.message}>
          <Typography variant="body2" color="textSecondary" component="p">
            {message}
          </Typography>
        </CardContent>
        {/* LIKE ICONS */}
        <CardActions>
          <IconButton aria-label="like">
            <FavoriteTwoToneIcon fontSize="small" />
            {likes}
          </IconButton>
          <IconButton>
            <CommentTwoToneIcon fontSize="small" />
            {comments}
          </IconButton>
        </CardActions>
        {/* COMMENT */}
        <CardActions className={classes.comment}>
          <TextField id="standard-basic" label="Add comment..." />
          <Button variant="outlined">Post</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(PostCard);
