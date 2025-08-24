import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, Button } from "@nextui-org/react";
import { Heart, MessageCircle } from 'lucide-react';
import type { Comment } from '../types';

interface CommentCardProps {
  comment: Comment;
  onLike: (id: number) => void;
  onReply?: (id: number) => void;
}

export default function CommentCard({ comment, onLike, onReply }: CommentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group"
    >
      <div className="relative">
        <div className="absolute -left-[22px] top-0 h-full w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
        <div className="pl-6 relative hover:bg-white/5 rounded-r-2xl transition-colors duration-300 p-4">
          <div className="flex gap-4">
            <Avatar 
              src={comment.avatar} 
              className="w-10 h-10 ring-2 ring-white/10 transition-all duration-300 group-hover:ring-purple-500/30" 
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white/90">{comment.user}</span>
                <span className="text-xs text-white/40">{comment.timestamp}</span>
              </div>
              <p className="text-white/80 leading-relaxed">{comment.content}</p>
              <div className="flex items-center gap-4 pt-2">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => onLike(comment.id)}
                  className={`group transition-all duration-300 ${
                    comment.liked ? 'text-pink-500' : 'text-white/40 hover:text-pink-500'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      comment.liked ? 'scale-110' : 'scale-100 group-hover:scale-110'
                    }`} 
                    fill={comment.liked ? "currentColor" : "none"} 
                  />
                  <span className="ml-1 text-sm">{comment.likes}</span>
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => onReply?.(comment.id)}
                  className="text-white/40 hover:text-purple-500 transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}