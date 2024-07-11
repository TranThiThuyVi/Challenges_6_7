import React, { PropsWithChildren } from 'react';
import Footer from '../components/Footer';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
