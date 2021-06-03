import _ from 'lodash';
import React from 'react';
import context from 'context/index.js';

export const useSelectedCategory = () => {
  return React.useContext(context.filter.selectedCategory);
};

export const FilterProvider = ({children}) => {
  const [categoryName, setCategoryName] = React.useState('');

  const contextValue = React.useMemo(() => ({
    categoryName,
    setCategoryName
  }), [categoryName, setCategoryName]);

  return (
    <context.filter.selectedCategory.Provider value={contextValue}>
      {children}
    </context.filter.selectedCategory.Provider>
  );
};

export const CategorySelector = ({categoryList=[]}) => {
  const selectedCategory = React.useContext(context.filter.selectedCategory);

  const getOption = (name) => (
    <option key={name} value={name}>{`${name}`}</option>
  );

  return React.useMemo(() => {
    const onChange = ({ target: { value } }) => {
      selectedCategory.setCategoryName(value);
    };

    return (
      <select type="select" name="category-selector" {...{ onChange, value: selectedCategory.categoryName }}>
        <option key="all" value="">All Categories</option>
        {!_.isEmpty(categoryList) ? _.map(categoryList, (category) => getOption(category)) : null}
      </select>
    );
  }, [categoryList, selectedCategory]);
};