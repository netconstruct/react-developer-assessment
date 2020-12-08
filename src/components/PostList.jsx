import { formatDateString } from "../helpers/formatters";
import Post from "./Post";

const PostList = ({ posts }) => (
  <ul>
    {/* PostList.js */}
    {posts?.length > 0 ? (
      posts
        .sort(
          (prev, next) =>
            new Date(prev.publishDate).getTime() <
            new Date(next.publishDate).getTime()
        )
        .map((post) =>  (
            // Post.js
           <Post
           key={post.id}
            post={post}
           />
          )
        )
    ) : (
      <li>No Posts</li>
    )}
  </ul>
);
export default PostList;