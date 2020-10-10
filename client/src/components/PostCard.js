import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DeletePostButton from "./DeletePostButton";
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
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likes: this.props.post.likes.length
    };
  }

  handleLikeClick = async () => {
    const jwtToken = localStorage.token;
    let options = {
      method: "POST",
      headers: {
        Authorization: jwtToken
      }
    };

    // Like and Unlike Feature
    try {
      const response = await fetch(
        `/post/${this.props.post.postId}/like`,
        options
      );
      const data = await response.json();
      if (data.message === "Successfully unliked.") {
        this.setState({
          likes: this.props.post.likes.length,
          liked: false
        });
      } else if (data.message === "Successfully liked.") {
        this.setState({
          likes: this.props.post.likes.length + 1,
          liked: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    //destructering: const classes = this.props.classes
    const {
      classes,
      post: { message, handle, time, photoURL, comments, postId }
    } = this.props;

    const { likes } = this.state;

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
          action={<DeletePostButton postId={postId} />}
        />
        {/* PICTURE */}
        <CardMedia></CardMedia>
        {/* MESSAGE */}
        <CardContent className={classes.message}>
          <Typography variant="body2" color="textSecondary" >
            {message}
          </Typography>
        </CardContent>
        {/* LIKE ICONS */}
        <CardActions>
          <IconButton aria-label="like">
            <FavoriteTwoToneIcon
              fontSize="small"
              onClick={this.handleLikeClick}
            />
            {likes}
          </IconButton>
          {/* COMMENT ICON */}
          <IconButton>
            <CommentTwoToneIcon fontSize="small" />
            {comments.length}
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
