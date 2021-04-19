import React from 'react';
import Seo from '@/components/Seo';
import MilliMenu from '@/components/MilliMenu';

export const Header: React.FC<{ title: string }> = ({ title }) => (
  <>
    <Seo title={title} />
    <header>
      <MilliMenu />
      <div className="header-line margin-auto" />
    </header>
  </>
);
