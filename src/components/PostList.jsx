import Post from './Post';

const PostList = ({ posts, isLoading, isError }) => (
  <ul>
    {posts?.length > 0 ? (
      posts
        .sort(
          (prev, next) =>
            new Date(prev.publishDate).getTime() <
            new Date(next.publishDate).getTime()
        )
        .map((post) => <Post key={post.id} post={post} />)
    ) : (
      <li>No Posts</li>
    )}
  </ul>
);
export default PostList;
