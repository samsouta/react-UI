import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  children, 
  loading = false, 
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden group
        px-8 py-4 rounded-xl font-semibold text-white
        bg-gradient-to-r from-blue-600 to-purple-600
        hover:from-blue-700 hover:to-purple-700
        disabled:from-gray-400 disabled:to-gray-500
        shadow-lg hover:shadow-xl
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200
        disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
      
      <div className="relative flex items-center justify-center gap-2">
        {loading && (
          <Loader2 className="animate-spin" size={20} />
        )}
        {children}
      </div>
    </button>
  );
};