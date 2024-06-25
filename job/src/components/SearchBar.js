import React, { useState } from 'react';
import Companies from '../assets/companies.jpg';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput.trim());
  };

  return (
    <div className="flex justify-center items-center my-4">
      <div className="relative w-[1100px] h-[100px] p-8 bg-white flex justify-center items-center shadow-md rounded-md">
        <img
          src={Companies}
          alt="Companies"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
        <form className="relative w-full max-w-[700px]" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border border-white bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
            placeholder="Enter Company Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-1 top-1 h-8 px-4 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
