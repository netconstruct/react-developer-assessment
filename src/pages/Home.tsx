import React, { useMemo } from 'react';
import { Select, Input } from 'antd';
import { Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { filterAndSortPosts, getFormatedDate, CategoriesEnum } from './utils';
import { PostType } from './types';
import Box from '../components/Box';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';

const { Option } = Select;
const { Search } = Input;
const { Text, Title } = Typography;

const Post = ({ post, isEven }: { post: PostType; isEven: boolean }) => {
  const date = getFormatedDate(post.publishDate);
  const props = { bg: isEven ? '#deffff' : undefined, padding: '3px' };
  return (
    <>
      <Box
        as="img"
        src={post.author.avatar}
        border={`1px ${isEven ? 'cyan' : 'pink'} solid`}
        borderRadius="3px"
      />
      <Box title={post.author.name} {...props}>
        {post.author.name}
      </Box>
      <Box title={post.title} {...props}>
        {post.title}
      </Box>
      <Box title={post.summary} {...props}>
        {post.summary}
      </Box>
      <Box title={date} {...props}>
        {date}
      </Box>
    </>
  );
};

interface Props {
  posts: Array<PostType>;
}

const PageSize = 30;
const Home = ({ posts = [] }: Props) => {
  const [sortBy, setSortBy] = useLocalStorage('sortBy', CategoriesEnum.all);
  const [sortDesc, setSortDesc] = useLocalStorage('sortDesc', false);
  const [query, setQuery] = useLocalStorage('query', '');
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);

  const filteredSortedPosts = useMemo(() => {
    if (sortDesc) return filterAndSortPosts(posts, sortBy, query).reverse();
    return filterAndSortPosts(posts, sortBy, query);
  }, [sortBy, query, posts, sortDesc]);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const entriesOnPage = filteredSortedPosts.slice(
    firstPageIndex,
    lastPageIndex
  );

  const onSetSortBy = (newState: CategoriesEnum) => {
    setSortBy((prevState: CategoriesEnum) => {
      if (prevState === newState) setSortDesc(!sortDesc);
      return newState;
    });
  };

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
                onChange={onSetSortBy}
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

      <Box
        display="grid"
        gridTemplateColumns="55px auto auto auto auto"
        gridGap="2px"
        mx={['4px', '8px']}
      >
        <Box textAlign="center" onClick={() => setSortDesc(!sortDesc)}>
          {sortDesc ? <DownOutlined /> : <UpOutlined />}
        </Box>
        <Text
          strong
          onClick={() => onSetSortBy(CategoriesEnum.author)}
          underline={sortBy === CategoriesEnum.author}
        >
          Author
        </Text>
        <Text
          strong
          onClick={() => onSetSortBy(CategoriesEnum.title)}
          underline={sortBy === CategoriesEnum.title}
        >
          Title
        </Text>
        <Text
          strong
          onClick={() => onSetSortBy(CategoriesEnum.summary)}
          underline={sortBy === CategoriesEnum.summary}
        >
          Summary
        </Text>
        <Text
          strong
          onClick={() => onSetSortBy(CategoriesEnum.date)}
          underline={sortBy === CategoriesEnum.date}
        >
          Date
        </Text>

        {entriesOnPage.map((post, index) => (
          <Post post={post} key={`post_${index}`} isEven={index % 2 === 0} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
