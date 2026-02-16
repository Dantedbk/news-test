import React from 'react';
import { ArrowLeft, Clock, Heart, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { Article, User } from '../../data/mockData';
import { format } from 'date-fns';
import { CommentSection } from './CommentSection';
import { motion } from 'motion/react';

interface ArticleViewProps {
  article: Article;
  currentUser: User;
  onBack: () => void;
  onLike: () => void;
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ 
  article, 
  currentUser,
  onBack, 
  onLike,
  onAddComment,
  onLikeComment
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto bg-white min-h-screen pb-20"
    >
      {/* Header / Nav */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
            <Bookmark size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 relative">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-4 md:left-8 right-4 text-white">
          <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-bold mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight shadow-sm">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6">
        {/* Meta */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
            <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">{article.author.name}</p>
              <p className="text-gray-500 text-xs">{format(new Date(article.publishedAt), 'MMM d, yyyy')}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock size={16} />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <article 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Action Bar */}
        <div className="my-10 py-6 border-t border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-6">
            <button 
              onClick={onLike}
              className="flex items-center gap-2 group"
            >
              <div className={`p-2 rounded-full transition-colors ${article.likes > 0 ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 group-hover:bg-red-50 group-hover:text-red-500'}`}>
                <Heart size={20} className={article.likes > 0 ? "fill-current" : ""} />
              </div>
              <span className="font-semibold text-gray-700">{article.likes} Me gusta</span>
            </button>
            <button className="flex items-center gap-2 group">
               <div className="p-2 rounded-full bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <MessageSquare size={20} />
              </div>
              <span className="font-semibold text-gray-700">{article.comments.length} Comentarios</span>
            </button>
          </div>
        </div>

        {/* Comments */}
        <CommentSection 
          comments={article.comments}
          currentUser={currentUser}
          onAddComment={onAddComment}
          onLikeComment={onLikeComment}
        />
      </div>
    </motion.div>
  );
};
