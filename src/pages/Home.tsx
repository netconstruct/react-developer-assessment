import React, { useEffect }  from 'react';
import { useState } from 'react';
import { Select, Input } from 'antd';
import { Typography } from 'antd';

import {filterAndSortPosts, getFormatedDate, CategoriesEnum} from './utils'
import {PostType} from './types';
import Box from '../components/Box';
import useLocalStorage from "../hooks/use-local-storage";

const { Option } = Select;
const { Search } = Input;
const { Text,Title } = Typography;

const Post = ({ post }: { post: PostType }) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box as="img" src={post.author.avatar}/>
      <Box>{post.author.name}</Box>
      <Box>{post.title}</Box>
      <Box>{post.summary}</Box>
      <Box>{getFormatedDate(post.publishDate)}</Box>
    </Box>
  );
};

interface Props {
  posts: Array<PostType>;
}

const Home = ({ posts = [] }: Props) => {
  // const [items, setItems] = useLocalStorage("dnd-sheet-data", DATA);
  const [sortBy, setSortBy] = useLocalStorage('sortBy', CategoriesEnum.all);
  const [query, setQuery] = useLocalStorage('query', '');
  const [filteredSortedPosts, setFilteredSortedPosts] = useState(posts);
 
  useEffect(()=>{
    setFilteredSortedPosts(filterAndSortPosts(posts, sortBy, query))
  }, [sortBy, query, posts])

  console.log(sortBy, query, CategoriesEnum.title, Object.keys(CategoriesEnum))
  return (
    <div>
      <Title level={4}>Posts</Title>

      <Search
        allowClear
        placeholder="Enter search query"
        defaultValue={query}
        addonBefore={
          <Box>
            <Text italic>Sort/Search by</Text>
            <Select defaultValue={CategoriesEnum.all} value={sortBy} style={{ width: 120 }} onChange={setSortBy}>
              {Object.keys(CategoriesEnum).map(category => <Option value={category} key={`${category}_sortBy`}>{category}</Option>)}
            </Select>
          </Box>
        }
        onSearch={setQuery}
      />
     
     {/* TODO add pagination */}
      {filteredSortedPosts.map((post, index) => (
        <Post post={post} key={`post_${index}`} />
      ))}
    </div>
  );
};

export default Home;
