import React, { Component } from "react";
// components
import ProfileCard from "../components/ProfileCard";
import CircularProgress from "@material-ui/core/CircularProgress";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {
        likes: [],
        notifications: [],
        follows: [],
        followedBy: [],
        credentials: {}
      },
      loading: true
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
      this.setState({ profile: data, loading: false });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    let profile =
      this.state.loading === false ? (
        <ProfileCard profile={this.state.profile} />
      ) : (
        <CircularProgress />
      );

    return profile;
  }
}

export default Profile;
