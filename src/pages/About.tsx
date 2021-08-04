import React from "react";

import Box from '../components/Box';

const About = () => {
  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Box as="h2" fontWeight="strong">Demo React Page created by Todor Imreorov</Box>
      <Box display="flex" flexWrap="wrap"><Box  pr="4px">email: </Box><Box as="a" href="blurymind@gmail.com"/> </Box>
      <Box display="flex" flexWrap="wrap"><Box  pr="4px">git: </Box><Box as="a" href="https://github.com/blurymind"/> </Box> 
      Using Typography, Styled, Styled-systems, some Antd components and React-router-dom
    </Box>
  );
}

export default About;