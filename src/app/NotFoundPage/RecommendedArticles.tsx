import React from 'react';
import { Atom, TestTube, Brain } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import { LucideIcon } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  Icon: LucideIcon;
}

const recommendedArticles: Article[] = [
  {
    id: 1,
    title: "Quantum Computing Breakthrough",
    description: "Scientists achieve new milestone in quantum supremacy",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
    Icon: Atom,
  },
  {
    id: 2,
    title: "New Species Discovery",
    description: "Remarkable find in the Amazon rainforest",
    imageUrl: "https://images.unsplash.com/photo-1460411794035-42aac080490a?auto=format&fit=crop&q=80&w=400",
    Icon: TestTube,
  },
  {
    id: 3,
    title: "Brain-Computer Interface",
    description: "Latest developments in neural technology",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400",
    Icon: Brain,
  },
];

export const RecommendedArticles: React.FC = () => (
  <div className="container mx-auto px-4 py-16">
    <h2 className="text-2xl font-bold text-white mb-8 text-center">
      Recommended Articles
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {recommendedArticles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          description={article.description}
          imageUrl={article.imageUrl}
          Icon={article.Icon}
        />
      ))}
    </div>
  </div>
);