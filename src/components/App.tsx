import { useEffect, useState } from "react";
import { IPost } from "../utils/IPost";

const App = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('api/posts')
      .then(response => response.json())
      .then(results => setPosts(results.posts))
      .catch(error => console.error(`Oops, could not retrieve data. Please, try again later. \nError: ${error}`));
  }, []);

  return <div>{/* Complete the exercise here. */}</div>;
}

export default App;
