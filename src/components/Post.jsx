import { Link } from 'react-router-dom';
import { formatDateString } from '../helpers/formatters';
import AuthorLabel from './AuthorLabel';
import CategoriesList from './CategoriesList';
import styles from '../styles/post.module.scss';
const Post = ({ post, isDetail }) => (
  <Wrapper isDetail={isDetail} className={styles.wrapper}>
    <div className={styles.main}>
      <h2>{post.title}</h2>
      <AuthorLabel name={post.author.name} avatar={post.author.avatar} />
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
      <div>
        <p>{formatDateString(post.publishDate)}</p>
      </div>
      <div className={styles.postFooter}>
        <CategoriesList categories={post.categories} />
        {isDetail ? (
          <Link to="/">Back To Posts</Link>
        ) : (
          <Link to={`/post/${post.id}`}>Read more</Link>
        )}
      </div>
    </div>
  </Wrapper>
);

const Wrapper = ({ children, isDetail, className }) =>
  isDetail ? (
    <section className={className} id="post">
      {children}
    </section>
  ) : (
    <li className={className}>{children}</li>
  );
export default Post;
