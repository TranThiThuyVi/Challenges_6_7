import React from 'react';
import CatReSearch from '../components/CatReSearch';

interface CatArticlePageProps {
    onBack: () => void;
}

const CatArticlePage: React.FC<CatArticlePageProps> = ({onBack}) => {

    return (
        <div className="mx-auto">
            <CatReSearch onBack={onBack}/>
        </div>
    );
};

export default CatArticlePage;
