import React, { useEffect, useState } from 'react';
import { fetchBreedDetails } from '../components/api/API';
import { IBreedCats } from '../types/breed-cats.typing';

interface CatDetailsProps {
  breedId: string;
  onBack: () => void; 
}

const CatDetails: React.FC<CatDetailsProps> = ({ breedId, onBack }) => {
  const [breedDetail, setBreedDetail] = useState<IBreedCats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchBreedDetails(breedId);
        setBreedDetail(details);
      } catch (error) {
        setError('Failed to fetch breed details');
      }
    };

    fetchDetails();
  }, [breedId]);

  const renderStars = (value: number | undefined) => {
    const stars = [];
    const maxValue = 5;

    // Fill stars based on value, or grey out if value is undefined
    for (let i = 0; i < maxValue; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i < (value ?? 0) ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-8 h-8 inline-block transform scale-x-[-1] ${i < (value ?? 0) ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      );
    }
    return stars;
  };

  if (error) return <div>{error}</div>;
  if (!breedDetail) return <div>Loading...</div>;

  return (
    <div className="flex flex-col mx-4 lg:mx-[100px] lg:flex-row">
      <div className="lg:w-1/3 lg:mx-8">
        <div className='flex flex-row justify-end lg:justify-start'>
          <button
            className="text-xl font-bold mb-4 text-xs text-blue-600 cursor-pointer"
            onClick={onBack}
          >
            Go Back
          </button>
        </div>
        {breedDetail.image?.url && (
          <img
            src={breedDetail.image?.url}
            alt={breedDetail.name}
            className="w-84 h-64 lg:w-84 lg:h-96 object-cover rounded-lg"
          />
        )}
      </div>
      <div className="lg:w-2/3 lg:pl-4 font-dekko lg:mt-2">
        <h1 className="text-2xl font-bold mb-4">{breedDetail.name}</h1>
        <p className="mb-4">{breedDetail.description}</p>
        <div className="space-y-4">
          <p>
            <strong>Temperament:</strong>{' '}
            <span className="text-rose-700">{breedDetail.temperament}</span>
          </p>
          <p>
            <strong>Origin:</strong>{' '}
            <span className="text-rose-700">{breedDetail.origin}</span>
          </p>
          <p>
            <strong>Life Span:</strong>{' '}
            <span className="text-rose-700">{breedDetail.life_span} years</span>
          </p>
          <p><strong>Adaptability:</strong> <span className="float-right">{renderStars(breedDetail.adaptability ?? 0)}</span></p>
          <p><strong>Affection Level:</strong> <span className="float-right">{renderStars(breedDetail.affection_level ?? 0)}</span></p>
          <p><strong>Child Friendly:</strong> <span className="float-right">{renderStars(breedDetail.child_friendly ?? 0)}</span></p>
          <p><strong>Grooming:</strong> <span className="float-right">{renderStars(breedDetail.grooming ?? 0)}</span></p>
          <p><strong>Intelligence:</strong> <span className="float-right">{renderStars(breedDetail.intelligence ?? 0)}</span></p>
          <p><strong>Health Issues:</strong> <span className="float-right">{renderStars(breedDetail.health_issues ?? 0)}</span></p>
          <p><strong>Social Needs:</strong> <span className="float-right">{renderStars(breedDetail.social_needs ?? 0)}</span></p>
          <p><strong>Stranger Friendly:</strong> <span className="float-right">{renderStars(breedDetail.stranger_friendly ?? 0)}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CatDetails;
