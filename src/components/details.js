import _ from 'lodash';
import './index.css';
import React from 'react';
import moment from 'moment';
import { usePostsFetch } from 'api/posts/index.js';

export const Details = ({ match: { url } }) => {
  const { data } = usePostsFetch();

  const postId = url.substring(1);

  const selectedPost = React.useMemo(() => _.find(data, ['id', postId]), [data, postId]);

  return React.useMemo(() => (
    <div className="post__details">
      <img src={_.get(selectedPost, 'author.avatar')} alt={_.get(selectedPost, 'author.name')} />
      <h3>{_.get(selectedPost, 'author.name')}</h3>
      <p>{_.get(selectedPost, 'title')}</p>
      <p>Published: {moment.utc(_.get(selectedPost, 'publishDate')).format('MMMM D YYYY')}</p>
      <p>{_.get(selectedPost, 'summary')}</p>
    </div>
  ), [selectedPost]);
};