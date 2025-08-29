import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DivideIcon as LucideIcon } from 'lucide-react';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

export interface NotificationBoxProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: LucideIcon;
  variant?: NotificationVariant;
  autoClose?: boolean;
  autoCloseDelay?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const variantStyles = {
  info: {
    iconColor: 'text-sky-400',
    bgGradient: 'from-sky-500/20 to-blue-500/20',
    borderGlow: 'shadow-[0_0_20px_rgba(56,189,248,0.15)]',
  },
  success: {
    iconColor: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-green-500/20',
    borderGlow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]',
  },
  warning: {
    iconColor: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-yellow-500/20',
    borderGlow: 'shadow-[0_0_20px_rgba(250,204,21,0.15)]',
  },
  error: {
    iconColor: 'text-rose-400',
    bgGradient: 'from-rose-500/20 to-pink-500/20',
    borderGlow: 'shadow-[0_0_20px_rgba(244,114,182,0.15)]',
  },
};

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
};

const NotificationBox: React.FC<NotificationBoxProps> = ({
  isVisible,
  onClose,
  title,
  message,
  icon: Icon,
  variant = 'info',
  autoClose = true,
  autoCloseDelay = 5000,
  position = 'top-right',
}) => {
  const styles = variantStyles[variant];

  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose]);

  const getSlideDirection = () => {
    if (position.includes('right')) return { x: 100, opacity: 0 };
    if (position.includes('left')) return { x: -100, opacity: 0 };
    if (position.includes('top')) return { y: -100, opacity: 0 };
    return { y: 100, opacity: 0 };
  };

  const notificationVariants = {
    hidden: getSlideDirection(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      ...getSlideDirection(),
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`
            fixed z-50 w-full max-w-sm mx-4
            ${positionStyles[position]}
          `}
          variants={notificationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className={`
              relative
              bg-white/10 backdrop-blur-xl
              border border-white/20
              rounded-2xl
              ${styles.borderGlow}
              overflow-hidden
            `}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${styles.bgGradient} pointer-events-none`} />
            
            {/* Content */}
            <div className="relative p-4">
              <div className="flex items-start space-x-3">
                {/* Icon */}
                {Icon && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <Icon className={`w-5 h-5 ${styles.iconColor}`} />
                  </motion.div>
                )}
                
                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <motion.h4
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-sm font-semibold text-white leading-tight"
                  >
                    {title}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-1 text-xs text-white/80 leading-relaxed"
                  >
                    {message}
                  </motion.p>
                </div>
                
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  onClick={onClose}
                  className="
                    flex-shrink-0 w-6 h-6
                    rounded-full
                    bg-white/10 backdrop-blur-sm
                    border border-white/20
                    flex items-center justify-center
                    text-white/70 hover:text-white
                    hover:bg-white/20
                    transition-all duration-200
                    focus:outline-none focus:ring-1 focus:ring-white/30
                  "
                  aria-label="Close notification"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>
              
              {/* Progress bar for auto-close */}
              {autoClose && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-white/30 rounded-full"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: autoCloseDelay / 1000, ease: 'linear' }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBox;