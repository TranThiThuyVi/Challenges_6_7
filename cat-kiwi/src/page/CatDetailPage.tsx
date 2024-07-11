import React from 'react';
import CatDetails from '../components/CatDetails';
import CatPhotoGallery from '../components/CatPhotoGallery';

interface CatDetailPageProps {
  breedId: string;
  onBack: () => void;
}

const CatDetailPage: React.FC<CatDetailPageProps> = ({ breedId, onBack }) => {
  return (
    <div className='mb-[80px]'>
      <CatDetails breedId={breedId} onBack={onBack} />
      <CatPhotoGallery breedId={breedId} />
    </div>
  );
};

export default CatDetailPage;
