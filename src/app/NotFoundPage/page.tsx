import React from 'react';
import { NotFoundHero } from './NotFoundHero';
import { Footer } from '../footer';
import { RecommendedArticles } from './RecommendedArticles';

function NotFound() {
  
  return (
    <div className="min-h-screen ">
      <NotFoundHero />
      <RecommendedArticles  />
      <Footer />
    </div>
  );
}

export default NotFound;