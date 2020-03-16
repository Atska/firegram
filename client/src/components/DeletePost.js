import React, { Component, Fragment } from "react";
// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import DeleteIcon from "@material-ui/icons/Delete";

class DeleteButton extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleSubmit = () => {};
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <Tooltip title="Delete Post" placement="bottom">
          <Button onClick={this.handleClickOpen}>
            {<DeleteIcon color="secondary" fontSize="medium" />}
          </Button>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
