import React, { useMemo } from 'react';
import { Select, Input } from 'antd';
import { Typography } from 'antd';

import { filterAndSortPosts, getFormatedDate, CategoriesEnum } from './utils';
import { PostType } from './types';
import Box from '../components/Box';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';

const { Option } = Select;
const { Search } = Input;
const { Text, Title } = Typography;

const Post = ({ post }: { post: PostType }) => {
  const date = getFormatedDate(post.publishDate);
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box as="img" src={post.author.avatar} />
      <Box title={post.author.name}>{post.author.name}</Box>
      <Box title={post.title}>{post.title}</Box>
      <Box title={post.summary}>{post.summary}</Box>
      <Box title={date}>{date}</Box>
    </Box>
  );
};

interface Props {
  posts: Array<PostType>;
}

const PageSize = 30;
const Home = ({ posts = [] }: Props) => {
  // const [items, setItems] = useLocalStorage("dnd-sheet-data", DATA);
  const [sortBy, setSortBy] = useLocalStorage('sortBy', CategoriesEnum.all);
  const [query, setQuery] = useLocalStorage('query', '');
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);

  const filteredSortedPosts = useMemo(() => {
    return filterAndSortPosts(posts, sortBy, query);
  }, [sortBy, query, posts]);

  const entriesOnPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredSortedPosts.slice(firstPageIndex, lastPageIndex);

    // return filterAndSortPosts(posts, sortBy, query);
  }, [filteredSortedPosts, currentPage]);

  console.log(sortBy, query, CategoriesEnum.title, Object.keys(CategoriesEnum));
  return (
    <Box position="relative">
      <Title level={4}>Posts</Title>
      <Box
        position="sticky"
        top="0"
        left="50%"
        bg="white"
        px="3px"
        pb="2px"
        borderBottom="1px #80808085 solid"
      >
        <Pagination
          currentPage={currentPage}
          totalCount={filteredSortedPosts.length}
          pageSize={PageSize}
          onPageChange={setCurrentPage}
        />
        <Search
          allowClear
          placeholder="Enter search query"
          defaultValue={query}
          addonBefore={
            <Box>
              <Text italic>Sort/Search by</Text>
              <Select
                defaultValue={CategoriesEnum.all}
                value={sortBy}
                style={{ width: 120 }}
                onChange={setSortBy}
              >
                {Object.keys(CategoriesEnum).map((category) => (
                  <Option value={category} key={`${category}_sortBy`}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Box>
          }
          onSearch={setQuery}
        />
      </Box>

      {/* TODO use a table here, add pagination */}
      {entriesOnPage.map((post, index) => (
        <Post post={post} key={`post_${index}`} />
      ))}
    </Box>
  );
};

export default Home;
