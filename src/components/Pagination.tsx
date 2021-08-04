import React from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';
import Box, { Props as BoxProps } from '../components/Box';

interface Props extends BoxProps {
  onPageChange: (a: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  ...rest
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const nextDisabled = currentPage === lastPage;
  const onNext = () => {
    if (nextDisabled) return;
    onPageChange(currentPage + 1);
  };

  const previousDisabled = currentPage === 1;
  const onPrevious = () => {
    if (previousDisabled) return;
    onPageChange(currentPage - 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      {...(rest as BoxProps)}
    >
      <Box
        opacity={previousDisabled ? '0.5' : undefined}
        onClick={onPrevious}
        mr="5px"
      >
        ⬅️
      </Box>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <Box
            onClick={() => onPageChange(pageNumber as number)}
            border="1px #80808066 solid"
            m="2px"
            px="4px"
            minWidth="30px"
            borderRadius="2px"
            textAlign="center"
            {...(pageNumber === currentPage ? { borderColor: 'red' } : {})}
          >
            {pageNumber}
          </Box>
        );
      })}
      <Box opacity={nextDisabled ? '0.5' : undefined} onClick={onNext} ml="5px">
        ➡️
      </Box>
    </Box>
  );
};

export default Pagination;
