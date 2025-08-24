import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import CommentInput from './CommentInput';
import CommentCard from './CommentCard';
import type { Comment } from '../types';

const initialComments: Comment[] = [
  {
    id: 1,
    user: "Elena Wright",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "This is exactly what I needed! The insights about neural networks are fascinating. Would love to see more content about AI architecture patterns.",
    likes: 89,
    liked: false,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    user: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    content: "The way you explained complex concepts with practical examples is brilliant. I've been struggling with these concepts for weeks, and this video cleared everything up! 🚀",
    likes: 156,
    liked: true,
    timestamp: "5 hours ago"
  }
];

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleNewComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      user: "You",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
      content,
      likes: 0,
      liked: false,
      timestamp: "Just now"
    };
    setComments([newComment, ...comments]);
  };

  const handleLike = (id: number) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-white/5 p-2 rounded-lg">
          <MessageSquare className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-white/90">
          Discussion ({comments.length})
        </h2>
      </div>

      <CommentInput onSubmit={handleNewComment} />

      <div className="space-y-6 relative before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-white/5">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onLike={handleLike}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}