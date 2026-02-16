import React, { useState, useEffect } from 'react';
import { mockArticles, currentUser, Article, Comment } from '../data/mockData';
import { ArticleView } from './components/ArticleView';
import { NewsFeed } from './components/NewsFeed';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d3395f3e`;

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeArticle = articles.find(a => a.id === activeArticleId);

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (!projectId) {
           throw new Error("Project ID is missing. Check your supabase connection.");
        }

        console.log(`Fetching news from ${SERVER_URL}/news`);
        
        const response = await fetch(`${SERVER_URL}/news`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        if (!response.ok) {
           const text = await response.text();
           throw new Error(`Failed to fetch news: ${response.status} ${response.statusText} - ${text}`);
        }
        
        const data = await response.json();
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(String(err));
        setArticles(mockArticles); // Fallback to mock data so the app is still usable
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (id: string) => {
    setActiveArticleId(id);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveArticleId(null);
  };

  const handleLikeArticle = async () => {
    if (!activeArticle) return;
    
    // Optimistic update
    const prevArticles = [...articles];
    setArticles(prev => prev.map(a => {
      if (a.id === activeArticle.id) {
        return { ...a, likes: (a.likes || 0) + 1 };
      }
      return a;
    }));

    try {
      const response = await fetch(`${SERVER_URL}/news/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ articleId: activeArticle.id })
      });
      
      if (!response.ok) throw new Error('Failed to like article');
      
      // Update with server data to ensure consistency
      const data = await response.json();
      if (data.articles) {
         setArticles(data.articles);
      }
    } catch (err) {
      console.error(err);
      // Revert on error
      setArticles(prevArticles);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!activeArticle) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    // Optimistic update
    const prevArticles = [...articles];
    setArticles(prev => prev.map(a => {
      if (a.id === activeArticle.id) {
        return { ...a, comments: [newComment, ...(a.comments || [])] };
      }
      return a;
    }));

    try {
      const response = await fetch(`${SERVER_URL}/news/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ articleId: activeArticle.id, comment: newComment })
      });
      
      if (!response.ok) throw new Error('Failed to post comment');
      
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error(err);
      setArticles(prevArticles);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!activeArticle) return;

    // Optimistic update
    const prevArticles = [...articles];
    setArticles(prev => prev.map(a => {
      if (a.id === activeArticle.id) {
        const updatedComments = a.comments.map(c => {
          if (c.id === commentId) {
            return { ...c, likes: (c.likes || 0) + 1 };
          }
          return c;
        });
        return { ...a, comments: updatedComments };
      }
      return a;
    }));

    try {
      const response = await fetch(`${SERVER_URL}/news/comment/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ articleId: activeArticle.id, commentId })
      });

      if (!response.ok) throw new Error('Failed to like comment');

      const data = await response.json();
       if (data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error(err);
      setArticles(prevArticles);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button className="p-2 -ml-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <Menu size={24} />
              </button>
              <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveArticleId(null)}>
                <span className="font-black text-2xl tracking-tighter text-blue-600">NEWS.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search stories..." 
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all duration-200"
                />
              </div>
              
              <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-50 transition-colors">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="h-8 w-8 rounded-full ring-2 ring-white" 
                />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{currentUser.name}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {error && (
            <div className="max-w-7xl mx-auto px-4 mt-4">
                 <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm border border-yellow-200 shadow-sm flex items-start gap-2">
                    <div className="flex-1">
                      <strong>Server Connection Error:</strong> {error}
                      <p className="mt-1 text-xs text-yellow-700">Displaying offline data. Interactive features (like/comment) may not persist.</p>
                    </div>
                 </div>
            </div>
        )}
        <AnimatePresence mode="wait">
          {activeArticle ? (
            <motion.div
              key="article"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ArticleView 
                article={activeArticle} 
                currentUser={currentUser}
                onBack={handleBack}
                onLike={handleLikeArticle}
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
              />
            </motion.div>
          ) : (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NewsFeed 
                articles={articles} 
                onArticleClick={handleArticleClick} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {!activeArticle && (
        <footer className="bg-white border-t border-gray-100 mt-12 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tighter text-gray-900">NEWS.</span>
              <span className="text-gray-500 text-sm">© 2024 All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
