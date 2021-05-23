import _ from 'lodash';
import React from 'react';

const calculateTotalPages = (totalNumberOfItems, itemsPerPage) => Math.ceil(totalNumberOfItems/itemsPerPage);

export const usePagination = (data = []) => {
  const itemsPerPage = 15;
  const totalNumberOfItems = data.length;
  const totalPages = calculateTotalPages(totalNumberOfItems, itemsPerPage);

  const [page, setPage] = React.useState({
    currentPage: 1,
    dataStart: 1,
    dataEnd: itemsPerPage,
    totalPages
  });

  React.useEffect(() => {
    setPage({
      currentPage: 1,
      dataStart: 1,
      dataEnd: itemsPerPage > totalNumberOfItems ? totalNumberOfItems : itemsPerPage,
      totalPages
    });
  }, [itemsPerPage, totalNumberOfItems, totalPages]);

  const PaginationControls = React.useCallback(() => {
    const onClick = (selectedPage) => {
      const startIndex = (itemsPerPage * selectedPage) + 1;
      const endIndex = (itemsPerPage * selectedPage) + itemsPerPage;
      setPage({
        currentPage: selectedPage,
        dataStart: startIndex < totalNumberOfItems ? startIndex : totalNumberOfItems,
        dataEnd: endIndex < totalNumberOfItems ? endIndex : totalNumberOfItems,
        totalPages
      });
    };

    return totalNumberOfItems > 0 ? (
      <div className="pagination">
        { _.times(page.totalPages, (pageNumber) =>
          <span className="pagination__page-number" key={`pagination-${pageNumber}`} onClick={() => onClick(pageNumber)}>{pageNumber+1}</span>
        )}
      </div>
    ) : null;
  }, [page, totalNumberOfItems, totalPages]);

  const paginatedData = _.slice(data, page.dataStart - 1, page.dataEnd);

  return [PaginationControls, paginatedData];
};
