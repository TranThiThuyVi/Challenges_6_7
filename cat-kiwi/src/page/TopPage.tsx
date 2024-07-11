import React from 'react';
import CatList from '../components/CatList';

interface TopPageProps {
  onBack: () => void;
}

const TopPage: React.FC<TopPageProps> = ({ onBack }) => { 
  return (
    <div>
      <CatList onBack={onBack} />
    </div>
  );
};

export default TopPage;
