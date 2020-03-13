import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    maxWidth: 500,
    minWidth: 500,
    marginBottom: "5%",
    border: "1",
    minHeight: "20vh"
  },
  textfield: {
    margin: "3%",
    maxWidth: 465,
    minWidth: 465
  }
};

class MessageCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows="4"
          defaultValue=""
          variant="outlined"
          className={classes.textfield}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(MessageCard);
