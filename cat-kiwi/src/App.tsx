import React, { useState, useEffect } from 'react';
import FooterLayout from './layout/FooterLayout';
import HomePage from './page/HomePage';
import CatDetailPage from './page/CatDetailPage';
import TopPage from './page/TopPage';
import CatArticlePage from './page/CatArticlePage';
import iconMeo from './assets/img/iconmeo.jpg';

const App: React.FC = () => {
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState<string>('Home Page');
  const [isTopPage, setIsTopPage] = useState<boolean>(false);
  const [isArticlePage, setIsArticlePage] = useState<boolean>(false);

  useEffect(() => {
    if (isTopPage) {
      setPageTitle('Top Page');
    } else if (isDetailPage && selectedBreedId) {
      setPageTitle('Cat Detail Page');
    } else if (isArticlePage) {
      setPageTitle('Cat Article Page');
    } else {
      setPageTitle('Home Page');
    }
    document.title = pageTitle;
  }, [isDetailPage, selectedBreedId, isTopPage, isArticlePage, pageTitle]);

  const handleHomeClick = (breedId: string) => {
    setSelectedBreedId(breedId);
    setIsDetailPage(true);
  };

  const handleBack = () => {
    setSelectedBreedId(null);
    setIsDetailPage(false);
    setIsTopPage(false);
    setIsArticlePage(false);
  };

  const handleTopPage = () => {
    setIsTopPage(true);
  };

  const handleShowArticlePage = () => {
    setIsArticlePage(true);
  };

  return (
    <div className="min-h-screen ">
      <div className="flex items-center mx-[100px] pt-8">
        <p className="text-left font-mystery text-3xl">CatKiwi</p>
        <img src={iconMeo} alt="Cat" className="w-10 h-12 pl-2 pb-2" />
      </div>
      <FooterLayout>
        {isTopPage ? (
          <TopPage onBack={handleBack} />
        ) : isDetailPage && selectedBreedId ? (
          <CatDetailPage breedId={selectedBreedId} onBack={handleBack} />
        ) : isArticlePage ? (
          <CatArticlePage onBack={handleBack} />
        ) : (
          <HomePage onClickBreed={handleHomeClick} onShowTopPage={handleTopPage} onShowArticlePage={handleShowArticlePage} />
        )}
      </FooterLayout>
    </div>
  );
};

export default App;
