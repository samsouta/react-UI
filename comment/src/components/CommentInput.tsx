import React, { useState } from 'react';
import { Avatar, Button, Input } from "@nextui-org/react";
import { SendHorizontal } from 'lucide-react';

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="relative">
      <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 backdrop-blur-xl border border-white/10">
        <Avatar
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150"
          className="w-10 h-10 ring-2 ring-purple-500/30"
        />
        <div className="flex-1 space-y-3">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add to the discussion..."
            classNames={{
              input: "bg-transparent text-white/90",
              inputWrapper: "bg-white/5 hover:bg-white/10 transition-colors"
            }}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
          />
          <div className="flex justify-end">
            <Button 
              color="secondary"
              variant="shadow"
              endContent={<SendHorizontal className="w-4 h-4" />}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}