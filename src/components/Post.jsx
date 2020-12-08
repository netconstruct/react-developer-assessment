import { formatDateString } from '../helpers/formatters';

const Post = ({ post }) => (
  <li>
    <h2>{post.title}</h2>
    <div>
      <p>
        {post.summary
          .slice(0, post.summary.length > 130 ? 130 : post.summary.length)
          .trim()}
        {post.summary.length > 130 && '...'}
      </p>
    </div>
    <div>
      <img src={post.author.avatar} aria-hidden="true" alt="author avatar" />
      <strong>{post.author.name}</strong>
    </div>
    <div>
      <p>{formatDateString(post.publishDate)}</p>
    </div>
    <ul>
      {post.categories?.map((category) => (
        <li key={category.id}>
          <button value={category.id}>{category.name}</button>
        </li>
      ))}
    </ul>
    <a href={`/post/${post.id}`}>Read more</a>
  </li>
);
export default Post;
