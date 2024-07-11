import React from 'react';
import iconMeo from '../assets/img/iconmeo.jpg';

interface CatReSearchProps {
    onBack: () => void;
}

const CatReSearch: React.FC<CatReSearchProps> = ({ onBack }) => {

    return (
        <div className="mx-4 lg:mx-[250px] mb-[80px] ">
            <p className='text-3xl font-bold font-dekko mt-8 text-center lg:text-left'>Benefits</p>
            <div className='flex pt-4 lg:pt-4 justify-end lg:justify-end '>
                <button onClick={onBack} className='flex text-xl font-bold mb-4 text-xs text-blue-600 cursor-pointer'>
                    <svg className="w-5 h-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 14.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L7.414 7H18a1 1 0 0 1 0 2H7.414l5.293 5.293z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
            </div>
            <img src="https://cdn2.thecatapi.com/images/26c.jpg" alt="Cat 1" className="w-full h-64 lg:h-full rounded-lg object-cover mt-4" />
            <p className='w-full font-dekko font-light text-sm mt-4 text-justify lg:text-left'>The research show that people with animals usually are more healthy and happy of they do not have, also we know the wonderful that is come back to home of a busy day and hear the satisfaction purr of a lovely cat. Is for that, we do not have any doubts that the cats are good pets.</p>
            <div className='mt-8 space-y-4'>
                <div className='flex rounded-lg shadow-lg'>
                    <img src={iconMeo} alt="Cat" className="w-8 h-8" />
                    <p className='m-1 text-sm'>Has been checked that have a cat reduce the stress and are big companion for those who feel sad or depressed.</p>
                </div>
                <div className='flex rounded-lg shadow-lg'>
                    <img src={iconMeo} alt="Cat" className="w-8 h-8" />
                    <p className='m-1 text-sm'>Has been checked that have a cat reduce the stress and are big companion for those who feel sad or depressed.</p>
                </div>
                <div className='flex rounded-lg shadow-lg'>
                    <img src={iconMeo} alt="Cat" className="w-8 h-8" />
                    <p className='m-1 text-sm'>Has been checked that have a cat reduce the stress and are big companion for those who feel sad or depressed.</p>
                </div>
                <div className='flex rounded-lg shadow-lg'>
                    <img src={iconMeo} alt="Cat" className="w-8 h-8" />
                    <p className='m-1 text-sm'>Has been checked that have a cat reduce the stress and are big companion for those who feel sad or depressed.</p>
                </div>
            </div>
        </div>
    );
};

export default CatReSearch;
