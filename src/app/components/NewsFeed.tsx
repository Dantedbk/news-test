import React from 'react';
import { Article } from '../../data/mockData';
import { NewsCard } from './NewsCard';
import { motion } from 'motion/react';

interface NewsFeedProps {
  articles: Article[];
  onArticleClick: (id: string) => void;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ articles, onArticleClick }) => {
  // Featured article (first one)
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">The Daily Brief</h1>
        <p className="text-gray-500 text-lg">Your curated feed of what matters today.</p>
      </header>

      {/* Featured Section */}
      {featured && (
        <section className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
            onClick={() => onArticleClick(featured.id)}
          >
            <div className="md:flex h-full md:h-[400px]">
              <div className="md:w-2/3 relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={featured.image} 
                  alt={featured.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
              </div>
              <div className="md:w-1/3 bg-gray-900 p-8 flex flex-col justify-center text-white relative">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <span className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-3">{featured.category}</span>
                <h2 className="text-3xl font-bold mb-4 leading-tight">{featured.title}</h2>
                <p className="text-gray-400 mb-6 line-clamp-3">{featured.summary}</p>
                <div className="flex items-center gap-3 mt-auto">
                   <img src={featured.author.avatar} alt={featured.author.name} className="w-8 h-8 rounded-full border-2 border-gray-700" />
                   <div className="text-sm">
                     <p className="font-medium text-gray-200">{featured.author.name}</p>
                     <p className="text-gray-500">{featured.readTime}</p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NewsCard article={article} onClick={onArticleClick} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
