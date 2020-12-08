import { Link } from 'react-router-dom';
import { formatDateString } from '../helpers/formatters';
import AuthorLabel from './AuthorLabel';
import CategoriesList from './CategoriesList';

const Post = ({ post, isDetail }) => {
  function handleItemClick(evt) {}
  return (
    <Wrapper isDetail={isDetail}>
      <div>
        <h2>{post.title}</h2>
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
        <AuthorLabel name={post.author.name} avatar={post.author.avatar} />
        <div>
          <p>{formatDateString(post.publishDate)}</p>
        </div>
        <CategoriesList
          categories={post.categories}
          onClickItem={handleItemClick}
        />
        {isDetail ? (
          <Link to="/">Back To Posts</Link>
        ) : (
          <Link to={`/post/${post.id}`}>Read more</Link>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = ({children,isDetail})=>(
    isDetail?children:<li>{children}</li>
)
export default Post;
