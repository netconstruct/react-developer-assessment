import _ from 'lodash';
import './index.css';
import React from 'react';
import { usePostsFetch } from 'api/posts/index.js';
import { useSelectedCategory, CategorySelector, FilterProvider } from 'components/categorySelector.js';
import { usePagination } from 'components/pagination.js';

export const PostsRows = ({data}) => (
  <>
    {_.map(data, (post) => {
      const postId = _.get(post, 'id');
      return (<div className="post__row" key={postId}>
        <a href={`/${postId}`}><span className="post__cell" key={`${_.get(post, 'id')}-title`}>
          {_.get(post, 'title')} </span></a>
        <span className="post__cell" key={`${_.get(post, 'id')}-author`} >
          {_.get(post, 'author.name')} </span>
      </div>
      );}
    )}
  </>
);

export const PostsHeader = () => (
  <div className="post__header">
    <span>Title</span>
    <span>Author</span>
  </div>
);

export const Posts = ({data}) => {
  const { categoryName } = useSelectedCategory();

  const filteredData = _.isEmpty(categoryName) ? data : _.filter(data, ({categories}) => _.some(categories, ({name}) => _.isEqual(name, categoryName)));

  const [PaginationControls, paginatedData] = usePagination(filteredData);

  return React.useMemo(() => (
    <>
      <div className="post__list">
        <PostsHeader />
        <PostsRows { ...{data:paginatedData}} />
      </div>
      <PaginationControls />
    </>
  ), [paginatedData]);
};

export const List = () => {
  const { data } = usePostsFetch();

  const categories = _.uniq(_.reduce(data, (result, {categories}) => {
    const categoryNames = _.map(categories, 'name');
    return [...result, ...categoryNames];
  }, []));

  return (
    <div className="posts">
      <FilterProvider>
        <CategorySelector categoryList={categories} />
        <Posts {...{data}} />
      </FilterProvider>
    </div>
  );
};