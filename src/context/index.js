import React from 'react';

export const filter = {
  selectedCategory: React.createContext({
    name : ''
  })
};

export const context = {
  filter
};

export default context;