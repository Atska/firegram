import React, { Component } from "react";
// Material UI
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

const styles = {
  root: {
    maxWidth: 500,
    minWidth: 500,
    marginBottom: "5%",
    border: "1",
    minHeight: "20vh"
  }
};

class MessageCard extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const jwtToken = localStorage.token;
    let data = {
      message: this.state.message
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken
      },
      body: JSON.stringify(data)
    };
    const response = await fetch("/addPost", options);
    if (response.status === 200) {
      // reloads the window for updating pic || warning antipattern!
      window.location.reload();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        {/* MESSAGE FIELD */}
        <CardContent>
          <TextField
            id="message"
            label="Message"
            multiline
            rows="4"
            value={this.state.message}
            variant="outlined"
            className={classes.textfield}
            fullWidth
            onChange={this.handleChange}
          />
        </CardContent>
        <CardActions>
          {/* ADD BUTTON */}
          <Tooltip title="Add Post" placement="bottom">
            <Button onClick={this.handleSubmit}>
              {<AddCircleIcon color="primary" fontSize="medium" />}
            </Button>
          </Tooltip>
          {/* UPLOAD IMAGE BUTTON */}
          <Tooltip title="Upload image" placement="bottom">
            <Button color="primary" fontSize="large">
              <InsertPhotoIcon />
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(MessageCard);
