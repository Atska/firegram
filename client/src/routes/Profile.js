import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "hello",
      kek: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      kek: event.target.value
    });
    console.log(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault()
  };
  render() {
    return (
      <CardContent>
        <form onSubmit={this.handleSubmit}>
        <p>{this.state.count}</p>
        <TextField
          label="hk"
          value={this.state.kek}
          onChange={this.handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Hello World
        </Button>
      </form>
      </CardContent>
    );
  }
}

export default Profile;
