import React from 'react';

const CatBenefit: React.FC<{ onShowCatReSearch: () => void }> = ({ onShowCatReSearch }) => {
    return (
        <div className='flex flex-wrap mt-10 mb-20 lg:mb-[80px]'>
            <div className='w-full lg:w-1/2 px-4 lg:px-[50px] font-dekko'>
                <p className='text-3xl font-bold py-8'>Why should you have a cat?</p>
                <p className='py-4 font-light text-sm text-left'>Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety levels.</p>
                <button className='flex text-blue-300' onClick={onShowCatReSearch}>
                    Benefits
                    <svg className="w-5 h-5 ml-1 text-blue-300 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 14.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L7.414 7H18a1 1 0 0 1 0 2H7.414l5.293 5.293z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className='w-full lg:w-1/2 flex flex-row mt-4 justify-center lg:justify-end'>
                <div className='flex flex-col'>
                    <img src="https://cdn2.thecatapi.com/images/MTY5ODYwOA.jpg" alt="Cat 1" className="w-48 h-32 rounded-lg object-cover " />
                    <img src="https://cdn2.thecatapi.com/images/bor.jpg" alt="Cat 2" className="rounded-lg w-32 h-48 object-cover mt-4 mr-0 ml-auto" />
                </div>
                <div className='ml-4'>
                    <img src="https://cdn2.thecatapi.com/images/MTgyNDg4Ng.jpg" alt="Cat 3" className="w-32 h-48 rounded-lg object-cover" />
                </div>
            </div>
        </div>
    );
};

export default CatBenefit;
