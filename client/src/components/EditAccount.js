import React, { Component, Fragment } from "react";
// import jwt_decode from "jwt-decode";
// Material UI
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
// Icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";

class EditAccount extends Component {
  constructor() {
    super();
    this.state = {
      bio: "",
      website: "",
      open: false
    };
  }

  componentDidMount() {
    this.setState({ bio: this.props.bio ? this.props.bio : "" });
    this.setState({ website: this.props.website ? this.props.website : "" });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const jwtToken = localStorage.token;
    let data = {
      bio: this.state.bio,
      website: this.state.website
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch("/user", options);
      if (response.status === 200) {
        this.setState(this.state);
        this.handleClose();
        // reloads the window for updating pic || warning antipattern!
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <Tooltip title="Edit account details" placement="bottom">
          <Button
            size="small"
            color="primary"
            startIcon={<AccountBoxIcon />}
            onClick={this.handleClickOpen}></Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Account</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="website"
              label="Website"
              variant="outlined"
              value={this.state.website}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              multiline
              rows="3"
              margin="dense"
              id="bio"
              label="Biography"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.bio}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default EditAccount;
