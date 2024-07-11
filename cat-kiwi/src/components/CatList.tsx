import React, { useEffect, useState } from 'react';
import { fetchTopBreeds } from '../components/api/API';
import { IBreedCats } from '../types/breed-cats.typing';

interface CatListProps {
  onBack: () => void;
}

const CatList: React.FC<CatListProps> = ({ onBack }) => {
  const [popularBreeds, setPopularBreeds] = useState<IBreedCats[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularBreeds = async () => {
      try {
        const breeds = await fetchTopBreeds();
        const popularBreedsData = breeds.slice(0, 10); 

        setPopularBreeds(popularBreedsData);
      } catch (error) {
        setError('Failed to fetch popular breeds. Please try again later.');
        console.error('Error fetching popular breeds:', error);
      }
    };

    fetchPopularBreeds();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flex flex-col px-4 lg:px-8 lg:mx-20 mb-[80px]">
      <div className="mt-8">
        <p className="text-left font-bold font-dekko text-black text-2xl">
          Top 10 Most Popular Breeds
        </p>
        <div className='flex flex-row justify-end lg:justify-end mt-4 lg:mt-4'>
          <button
            onClick={onBack}
            className="flex text-xl font-bold text-xs text-blue-600 cursor-pointer"
          >
            <svg
              className="w-5 h-5 mr-1 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 14.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L7.414 7H18a1 1 0 0 1 0 2H7.414l5.293 5.293z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
        </div>
      </div>
      <div className="grid gap-8 mt-4">
        {popularBreeds.map((breed, index) => (
          <div key={breed.id} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 font-dekko">
            {breed.image && (
              <img
                src={breed.image.url}
                alt={breed.name}
                className="w-full md:w-64 h-64 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <div className="px-4 md:px-0">
                <p className="font-bold text-xl pb-2">
                  {index + 1}. {breed.name}
                </p>
                <p className="text-sm text-gray-700">{breed.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatList;
