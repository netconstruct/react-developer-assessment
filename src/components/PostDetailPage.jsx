// import React from 'react'

import { useParams } from 'react-router-dom';
import Post from './Post';

// import styles from '../styles/PostDetailPage.module.scss'
const PostDetailPage = ({ posts }) => {
  const { postId } = useParams();
  return postId?<Post post={posts.find(post=>post.id===postId)} isDetail={true}/>:<>Can't find Post</>;
};
export default PostDetailPage;
