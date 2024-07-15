import React, { useState } from 'react';
import Companies from '../assets/images/companies.jpg';

interface SearchBarProps {
  onSearch: (company: string) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [company, setCompany] = useState('');

  const handleSearch = async () => {
    await onSearch(company);
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  return (
    <div className="flex flex-row lg:flex-row justify-center items-center my-4">
      <div className="relative flex flex-col lg:w-[1100px] lg:h-[100px] p-8 bg-white flex justify-center items-center shadow-md rounded-md">
        <img src={Companies} alt="companies" className="absolute inset-0 w-full h-full object-cover rounded-md"/>
        <div className="relative w-full lg:max-w-[700px]">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by company"
            className="w-full p-2 border border-white bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1 h-8 px-4 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
