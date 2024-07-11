import React, { useEffect, useState } from 'react';
import { fetchTopBreeds } from '../components/api/API';
import { IBreedCats } from '../types/breed-cats.typing';

interface CatSummaryProps {
  onShowTopPage: () => void;
}

const CatSummary: React.FC<CatSummaryProps> = ({ onShowTopPage }) => {
  const [popularBreeds, setPopularBreeds] = useState<IBreedCats[]>([]);

  useEffect(() => {
    const fetchPopularBreeds = async () => {
      try {
        const breeds = await fetchTopBreeds();
        const popularBreedsData = breeds.slice(0, 4); 
        setPopularBreeds(popularBreedsData); 
      } catch (error) {
        console.error('Error fetching popular breeds:', error);
      }
    };

    fetchPopularBreeds();
  }, []);

  return (
    <div className="flex flex-col px-8">
      <div className="flex justify-start lg:justify-end pr-4 mb-4">
        <button className='flex text-right text-blue-500' onClick={onShowTopPage}>
          Top 10 Popular Breeds
          <svg className="w-5 h-5 ml-1 text-blue-500 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 14.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L7.414 7H18a1 1 0 0 1 0 2H7.414l5.293 5.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 lg:p-8 lg:grid-cols-4">
        {popularBreeds.map((breed) => (
          <div key={breed.id} className="flex items-center justify-center relative">
            <img
              src={breed.image?.url}
              alt={breed.name}
              className="w-52 h-52 rounded-lg object-fit lg:w-64 lg:h-64" 
              style={{ visibility: breed.image?.url ? 'visible' : 'hidden' }}
            />
            {breed.image?.url && (
              <div className='absolute bottom-2 left-2 right-2 lg:left-0 lg:right-0 flex items-center justify-center'>
                <p className="text-white bg-black p-1 rounded">{breed.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatSummary;
