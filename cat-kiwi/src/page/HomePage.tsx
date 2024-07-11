import React, { useState } from 'react';
import SearchCat from '../components/SearchCat';
import CatSummary from '../components/CatSummary';
import CatBenefit from '../components/CatBenefit';

interface HomePageProps {
  onClickBreed: (breedId: string) => void;
  onShowTopPage: () => void;
  onShowArticlePage: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onClickBreed, onShowTopPage, onShowArticlePage }) => {
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);

  const handleSelectBreed = (breedId: string) => {
    setSelectedBreedId(breedId);
    onClickBreed(breedId);
  };

  return (
    <div className='mb-20 lg:mb-[80px]'>
      <div className='bg-black text-white mx-4 lg:mx-[150px] rounded-t-lg mt-4 lg:mt-[20px]'>
        <SearchCat onSelectBreed={handleSelectBreed} />
      </div>
      <div className='bg-slate-200 text-black mx-4 lg:mx-[150px] rounded-b-lg '>
        {selectedBreedId && (
          <>
            <p className='font-dekko p-4 lg:p-8'>Selected Breed ID: {selectedBreedId}</p>
          </>
        )}
        <p className='font-dekko p-4 lg:p-8'>Most Searched Breeds</p>
        <p className='font-dekko p-4 lg:p-8 w-full lg:w-[300px] text-lg lg:text-xl'>66+ Breeds For you to discover</p>
        <CatSummary onShowTopPage={onShowTopPage} />
      </div>
      <div className='lg:mx-[150px] mt-4'>
        <CatBenefit onShowCatReSearch={onShowArticlePage} />
      </div>
    </div>
  );
};

export default HomePage;
