import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue' 
}) => {
  const glowClasses = {
    blue: 'shadow-blue-500/20 border-blue-500/20',
    green: 'shadow-green-500/20 border-green-500/20',
    yellow: 'shadow-yellow-500/20 border-yellow-500/20',
    red: 'shadow-red-500/20 border-red-500/20',
    purple: 'shadow-purple-500/20 border-purple-500/20'
  };

  return (
    <div className={`
      backdrop-blur-xl bg-white/10 dark:bg-black/10
      border border-white/20 dark:border-white/10
      rounded-2xl shadow-xl ${glowClasses[glowColor]}
      transition-all duration-300 hover:shadow-2xl
      hover:bg-white/20 dark:hover:bg-black/20
      ${className}
    `}>
      {children}
    </div>
  );
};