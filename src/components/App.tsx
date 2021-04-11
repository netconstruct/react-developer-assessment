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

// returns all posts that have that selectedCategory
const filterPostsByOneCategory = (posts: IPost[], selectedCategory: string): IPost[] => {
  return posts.filter(post => post.categories.findIndex(cat => cat.name === selectedCategory) !== -1);
}

const App = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [allFilteredPosts, setAllFilteredPosts] = useState<IPost[]>([]);

  const filterPostsByCategories = (selectedCategories: string[]) => {
    let filteredPosts: IPost[] = [];

    if (selectedCategories.length > 0) {

      // add the posts that have a specific selected category to filteredPosts; this will create duplicates, 
      // which is resolved after the if statement
      selectedCategories.forEach(selectedCategory => {
        filteredPosts.push(...filterPostsByOneCategory(posts, selectedCategory));
      });
    } else {
      filteredPosts = [...posts];
    }

    // remove post duplaicates and set allFilteredPosts
    setAllFilteredPosts(Array.from(new Set(filteredPosts)));
  }

  useEffect(() => {
    fetch('api/posts', {
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(results => {
        setPosts([...results.posts]);
        setAllFilteredPosts([...results.posts]);
      })
      .catch(error => console.error(`Oops, could not retrieve data. Please, try again later. \nError: ${error}`));
  }, []);

  return (
    <main className={classes.root}>
      <PostsFilter posts={posts} filterPostsByCategories={filterPostsByCategories} />
      <Posts posts={allFilteredPosts} />
    </main>
  );
}

export default App;