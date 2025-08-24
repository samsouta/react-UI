import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import CommentSection from './components/CommentSection';

function App() {
  return (
    <NextUIProvider>
      <div className="min-h-screen bg-[#0A0118] bg-gradient-to-b from-purple-900/20">
        <div className="container mx-auto py-12 px-4">
          {/* Video placeholder */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-purple-500/10">
            <div className="relative bg-black aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800" 
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
          
          <CommentSection />
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;