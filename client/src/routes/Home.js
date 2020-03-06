import React, { Component } from "react";
//components
import PostCard from "../components/PostCard";
//Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
    let posts = this.state.posts ? (
      this.state.posts.map(post => {
        return <PostCard post={post} key={post.handle} />;
      })
    ) : (
      <Paper>Loading all posts..</Paper>
    );

    return (
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center">
        {/* MESSAGE */}
        <Grid>
          <Paper elevation={3}>MESSAGE HERE!</Paper>
        </Grid>
        {/* POST ITEMS*/}
        <Grid item xs={"auto"}>
          {posts}
        </Grid>
      </Grid>
    );
  }
}

export default Home;
