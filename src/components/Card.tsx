import { format } from 'date-fns';

import styles from '../styles/components/Card.module.scss';

import { PostI } from '../contexts/PostsContext';

interface CardI {
  post: PostI;
}

function Card({ post }: CardI) {
  const { title, summary, publishDate, author } = post;
  const formattedDate = format(new Date(publishDate), 'MMMM dd, yyyy');

  return (
    <div className={styles.card}>
      <main>
        <h1 className={styles.title}>{title}</h1>
        <p>{summary}</p>
      </main>

      <footer>
        <div>
          <p>{author.name}</p>
          <span>{formattedDate}</span>
        </div>
        <img src={author.avatar} alt="Author Avatar" />
      </footer>
    </div>
  );
}

export default Card;
