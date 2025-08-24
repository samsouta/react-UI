import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'failed';
  animated?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, animated = false }) => {
  const configs = {
    pending: {
      icon: Clock,
      text: 'Pending',
      className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      glowClass: animated ? 'animate-pulse shadow-yellow-500/50' : ''
    },
    confirmed: {
      icon: CheckCircle,
      text: 'Confirmed',
      className: 'bg-green-500/20 text-green-300 border-green-500/30',
      glowClass: animated ? 'shadow-green-500/50' : ''
    },
    failed: {
      icon: XCircle,
      text: 'Failed',
      className: 'bg-red-500/20 text-red-300 border-red-500/30',
      glowClass: animated ? 'animate-pulse shadow-red-500/50' : ''
    }
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
      border backdrop-blur-sm text-sm font-medium
      transition-all duration-300
      ${config.className} ${config.glowClass}
    `}>
      <Icon size={14} />
      {config.text}
    </div>
  );
};