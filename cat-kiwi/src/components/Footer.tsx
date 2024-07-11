import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-black p-4 fixed bottom-0 left-0 right-0 rounded-t-lg mx-[50px] z-50">
      <div className="flex flex-row mx-auto">
        <p className="text-left font-mystery text-white text-2xl">CatKiwi</p>
        <div className='flex-1'>
            <p className="text-right text-white text-sm font-serif pt-2">© created by Vi</p>
        </div>
      </div>
    </div>
  );
};

export default Footer; 
