import React from 'react';
import { Clock, Heart, MessageSquare } from 'lucide-react';
import { Article } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  article: Article;
  onClick: (id: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full"
      onClick={() => onClick(article.id)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
          {article.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <img src={article.author.avatar} alt={article.author.name} className="w-6 h-6 rounded-full" />
          <span className="text-xs text-gray-500 font-medium">{article.author.name}</span>
          <span className="text-xs text-gray-300">•</span>
          <span className="text-xs text-gray-400">{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between text-gray-400 text-xs mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart size={14} className={article.likes > 0 ? "fill-red-50 text-red-500" : ""} />
              <span>{article.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{article.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
