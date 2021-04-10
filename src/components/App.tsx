import { Posts } from "./posts/Posts";
import { useEffect, useState } from "react";
import { IPost } from "../utils/IPost";
import React from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from "@material-ui/core/colors";
import { PostsFilter } from "./filter/PostsFilter";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: grey[100],
      flexWrap: 'wrap',
    },
  }),
);

const App = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('api/posts', {
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(results => setPosts([...results.posts]))
      .catch(error => console.error(`Oops, could not retrieve data. Please, try again later. \nError: ${error}`));
  }, []);

  return (
    <main className={classes.root}>
      <PostsFilter posts={posts} />
      <Posts posts={posts} />
    </main>
  );
}

export default App;