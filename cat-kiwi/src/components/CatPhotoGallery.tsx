import React, { useEffect, useState } from 'react';
import { fetchBreedPhotos } from '../components/api/API';

interface CatPhotoGalleryProps {
  breedId: string;
}

const CatPhotoGallery: React.FC<CatPhotoGalleryProps> = ({ breedId }) => {
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosData = await fetchBreedPhotos(breedId);
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching breed photos:', error);
      }
    };

    fetchPhotos();
  }, [breedId]);

  return (
    <div className="flex lg:mx-[100px]">
      <div className='grid grid-cols-1 lg:grid-cols-4 my-8'>
        {photos.length > 0 && (
          <p className="font-bold text-2xl mb-4 col-span-4 text-left">Others photos</p>
        )}
        {photos.map((photo) => (
          <div className="mt-8 mx-2" key={photo.id}>
            <img 
              src={photo.url} 
              alt="Cat" 
              className="rounded-lg w-48 h-48 lg:w-64 lg:h-64 object-fit mb-4" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatPhotoGallery;
