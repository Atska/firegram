import React, { Component } from "react";
//components
import PostCard from "../components/PostCard";
import MessageCard from "../components/MessageCard";
//Material UI
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loading: true
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch("/posts");
      const json = await response.json();
      this.setState({ posts: json, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // maps over all posts and adds loading circle
    let posts = this.state.posts ? (
      this.state.posts.map(post => {
        return <PostCard post={post} key={post.handle} />;
      })
    ) : (
      <CircularProgress />
    );

    // Box is only displayed when posts are loaded
    let MessageBox = this.state.posts ? <MessageCard /> : null;

    return (
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center">
        {/* MESSAGE */}
        <Grid>{MessageBox}</Grid>
        {/* POST ITEMS*/}
        <Grid item xs={"auto"}>
          {posts}
        </Grid>
      </Grid>
    );
  }
}

export default Home;
