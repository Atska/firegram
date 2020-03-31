import React, { Component, Fragment } from "react";
// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import DeleteIcon from "@material-ui/icons/Delete";

class DeletePostButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const jwtToken = localStorage.token;

    let options = {
      method: "DELETE",
      headers: {
        Authorization: jwtToken
      }
    };

    const response = await fetch(`/post/${this.props.postId}`, options);
    const data = await response.json();
    console.log(data.message);
    this.setState({ open: false });
    if (response.status === 200) {
      window.location.reload();
    }
  };

  render() {
    return (
      <Fragment>
        <Tooltip title="Delete Post" placement="bottom">
          <Button onClick={this.handleClickOpen}>
            {<DeleteIcon fontSize="medium" />}
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

export default DeletePostButton;
