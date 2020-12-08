import { Link } from 'react-router-dom';
import { formatDateString } from '../helpers/formatters';
import AuthorLabel from './AuthorLabel';
import CategoriesList from './CategoriesList';

const Post = ({ post, isDetail }) =>  (
    <Wrapper isDetail={isDetail}>
      <div>
        <h2>{post.title}</h2>
        <AuthorLabel name={post.author.name} avatar={post.author.avatar} />
        <div>
          <p>
            {post.summary
              .slice(
                0,
                !isDetail && post.summary.length > 130
                  ? 130
                  : post.summary.length
              )
              .trim()}
            {!isDetail && post.summary.length > 130 && '...'}
          </p>
        </div>
        <div>
          <p>{formatDateString(post.publishDate)}</p>
        </div>
        <CategoriesList categories={post.categories} />
        {isDetail ? (
          <Link to="/">Back To Posts</Link>
        ) : (
          <Link to={`/post/${post.id}`}>Read more</Link>
        )}
      </div>
    </Wrapper>
  );

const Wrapper = ({ children, isDetail }) =>
  isDetail ? <section id="post">{children}</section> : <li>{children}</li>;
export default Post;
