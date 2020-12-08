import { useHistory, useParams } from 'react-router-dom';
import { formatDateString } from '../helpers/formatters';
import AuthorLabel from './AuthorLabel';
import CategoriesList from './CategoriesList';

const Post = ({ post, isDetail }) => {
  let history = useHistory();
  function handleItemClick(evt) {}
  return (
    <li>
      <h2>{post.title}</h2>
      <div>
        <p>
          {post.summary
            .slice(
              0,
              !isDetail && post.summary.length > 130 ? 130 : post.summary.length
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
      <a href={`/post/${post.id}`}>Read more</a>
    </li>
  );
};
export default Post;
