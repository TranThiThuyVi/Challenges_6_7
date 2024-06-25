import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  const displayPages = 5;

  let startPage, endPage;

  if (totalPages <= displayPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(displayPages / 2)) {
      startPage = 1;
    } else if (currentPage > totalPages - Math.floor(displayPages / 2)) {
      startPage = totalPages - displayPages + 1;
    } else {
      startPage = currentPage - Math.floor(displayPages / 2);
    }
    endPage = startPage + displayPages - 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-end mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-10 h-8 bg-white rounded-md text-center border border-stone-300 text-slate-300 hover:border-blue-500 focus:bg-blue-500 focus:text-white"
        >
          &laquo;
        </button>
      )}
      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="w-12 h-8 bg-white rounded-md text-center border border-stone-300 text-slate-300 hover:border-blue-500 focus:bg-blue-500 focus:text-white"
        >
          1
        </button>
      )}
      {startPage > 2 && (
        <span className="px-2 mt-1">...</span>
      )}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-12 h-8 bg-white rounded-md text-center ${
            currentPage === page ? 'bg-white border border-stone-300 text-slate-300' : ''
          } hover:border hover:border-blue-500 focus:bg-blue-500 focus:text-white`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages - 1 && (
        <span className="px-2 mt-1">...</span>
      )}
      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="w-12 h-8 bg-white rounded-md text-center border border-stone-300 text-slate-300 hover:border-blue-500 focus:bg-blue-500 focus:text-white"
        >
          {totalPages}
        </button>
      )}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-10 h-8 bg-white rounded-md text-center border border-stone-300 text-slate-300 hover:border-blue-500 focus:bg-blue-500 focus:text-white"
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
