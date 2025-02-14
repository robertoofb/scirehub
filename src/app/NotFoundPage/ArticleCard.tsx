import React from 'react';
import { LucideIcon } from 'lucide-react';
interface ArticleCardProps {
    title: string;
    description: string;
    imageUrl: string;
    Icon: LucideIcon;
  }
  
  export const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, Icon }) => (
    <div className="rounded-xl shadow-lg bg-[#1C323D] overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="text-white -600">
          {description}
        </p>
        <button className="mt-4 text-[#4C8CA5] font-medium hover:text-[#D98E04] transition-colors duration-300">
          Read More →
        </button>
      </div>
    </div>
  );