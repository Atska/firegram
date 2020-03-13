import React, { Component } from "react";
// components
import ProfileCard from "../components/ProfileCard";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: null,
      loading: true
    };
  }
  render() {
    return <ProfileCard />;
  }
}

export default Profile;
