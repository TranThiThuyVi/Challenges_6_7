import React, { useState, useEffect } from 'react';
import { searchBreeds, fetchAllBreeds } from '../components/api/API';
import { IBreedCats } from '../types/breed-cats.typing';
import Meo from '../assets/img/meongau.jpg';

interface SearchCatProps {
  onSelectBreed: (breedId: string) => void;
}

const SearchCat: React.FC<SearchCatProps> = ({ onSelectBreed }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IBreedCats[]>([]);
  const [allBreeds, setAllBreeds] = useState<IBreedCats[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const fetchBreeds = async () => {
      const breeds = await fetchAllBreeds();
      setAllBreeds(breeds);
    };

    fetchBreeds();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = async () => {
    if (query) {
      const exactMatch = allBreeds.find(breed => breed.name.toLowerCase() === query.toLowerCase());
      if (exactMatch) {
        handleSelectBreed(exactMatch);
      } else {
        const breeds = await searchBreeds(query);
        setResults(breeds);
        setDropdownVisible(true);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setDropdownVisible(true);
  };

  const handleSelectBreed = (breed: IBreedCats) => {
    setQuery(breed.name);
    setDropdownVisible(false);
    onSelectBreed(breed.id);
    setIsModalVisible(false); // Đóng modal khi chọn breed
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleFocus = () => {
    if (isMobile) { 
      setIsModalVisible(true);
    } else {
      setDropdownVisible(true);
    }
  };

  return (
    <div className="search-bar relative flex flex-row lg:flex-row items-center">
      <div className="flex flex-col items-start p-8 lg:p-16 w-full">
        <p className="text-left font-mystery text-white text-4xl sm:text-6xl pb-4 sm:pb-8">CatKiwi</p>
        <p className='text-white text-lg sm:text-2xl w-full sm:w-[320px] font-dekko py-4 sm:py-8'>Get to know more about your cat breed</p>
        <div className="relative w-full sm:w-[200px] mb-4 sm:mb-8">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for cat breeds..."
            className="border rounded p-2 w-full text-black"
            onFocus={handleFocus}
          />
          {!isMobile && (
            <div>
              <button onClick={toggleDropdown} className="absolute right-2 top-3 focus:outline-none text-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 14.25l-5.5-5.5h11z" />
                </svg>
              </button>
              {dropdownVisible && (
                <div className="absolute left-0 right-0 bg-white border rounded shadow-md mt-1 max-h-60 overflow-y-auto lg:bottom-full text-black">
                  <ul className="p-2">
                    {results.length > 0 ? (
                      results.map(breed => (
                        <li
                          key={breed.id}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectBreed(breed)}
                        >
                          {breed.name}
                        </li>
                      ))
                    ) : (
                      allBreeds
                        .filter(breed => breed.name.toLowerCase().includes(query.toLowerCase()))
                        .map(breed => (
                          <li
                            key={breed.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectBreed(breed)}
                          >
                            {breed.name}
                          </li>
                        ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex'>
        <img src={Meo} alt="Cat" className="w-full lg:w-[700px] h-[300px] lg:h-[500px] rounded-lg border-none" />
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 flex pt-4 items-start justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
            <div className="relative w-full mb-4">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for cat breeds..."
                className="border rounded p-2 w-full text-black"
                onFocus={() => setDropdownVisible(true)}
                onBlur={() => setTimeout(() => setDropdownVisible(false), 10)}
              />
              <button onClick={toggleDropdown} className="absolute right-2 top-3 focus:outline-none text-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 14.25l-5.5-5.5h11z" />
                </svg>
              </button>
              {dropdownVisible && (
                <div className="absolute left-0 right-0 bg-white border rounded shadow-md mt-1 max-h-60 overflow-y-auto lg:bottom-full text-black">
                  <ul className="p-2">
                    {results.length > 0 ? (
                      results.map(breed => (
                        <li
                          key={breed.id}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectBreed(breed)}
                        >
                          {breed.name}
                        </li>
                      ))
                    ) : (
                      allBreeds
                        .filter(breed => breed.name.toLowerCase().includes(query.toLowerCase()))
                        .map(breed => (
                          <li
                            key={breed.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectBreed(breed)}
                          >
                            {breed.name}
                          </li>
                        ))
                    )}
                  </ul>
                </div>
              )}
            </div>
            <button onClick={() => setIsModalVisible(false)} className="mt-4 p-2 bg-red-500 text-white rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCat;
