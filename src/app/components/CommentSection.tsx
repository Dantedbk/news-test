import React, { useState } from 'react';
import { Send, ThumbsUp, Trash2 } from 'lucide-react';
import { Comment, User } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

interface CommentSectionProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ 
  comments, 
  currentUser, 
  onAddComment, 
  onLikeComment,
  onDeleteComment
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Comentarios ({comments.length})</h3>
      
      {/* Input */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-grow relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="¿Cuáles son tus pensamientos?"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
          />
          <div className="absolute bottom-3 right-3">
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </form>

      {/* List */}
      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-4 group"
            >
              {/* Avatar placeholder - in a real app we'd fetch the user data for this comment */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                {/* For mock purposes, we're just using a generic avatar if we can't find the user easily, 
                    but in our mock data structure, we might want to lookup the user. 
                    For simplicity, let's just generate a random avatar based on ID or use a placeholder */}
                <img 
                   src={`https://i.pravatar.cc/150?u=${comment.userId}`}
                   alt="User"
                   className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">User {comment.userId}</span>
                    <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.timestamp))} ago</span>
                  </div>
                  {comment.userId === currentUser.id && onDeleteComment && (
                    <button 
                      onClick={() => onDeleteComment(comment.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{comment.content}</p>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onLikeComment(comment.id)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <ThumbsUp size={14} />
                    <span>{comment.likes || 0}</span>
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-800 font-medium">
                    Responder
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {comments.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>Sin comentarios aún. ¡Sé el primero en compartir tus pensamientos!</p>
          </div>
        )}
      </div>
    </div>
  );
};
