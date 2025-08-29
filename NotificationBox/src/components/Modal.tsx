import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DivideIcon as LucideIcon } from 'lucide-react';

export type ModalVariant = 'info' | 'success' | 'warning' | 'error';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: LucideIcon;
  variant?: ModalVariant;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

const variantStyles = {
  info: {
    iconColor: 'text-sky-400',
    glowColor: 'shadow-sky-400/20',
    borderGlow: 'shadow-[0_0_20px_rgba(56,189,248,0.15)]',
  },
  success: {
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-400/20',
    borderGlow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]',
  },
  warning: {
    iconColor: 'text-amber-400',
    glowColor: 'shadow-amber-400/20',
    borderGlow: 'shadow-[0_0_20px_rgba(250,204,21,0.15)]',
  },
  error: {
    iconColor: 'text-rose-400',
    glowColor: 'shadow-rose-400/20',
    borderGlow: 'shadow-[0_0_20px_rgba(244,114,182,0.15)]',
  },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  icon: Icon,
  variant = 'info',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}) => {
  const styles = variantStyles[variant];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
          
          {/* Modal */}
          <motion.div
            className={`
              relative w-full max-w-md mx-auto
              bg-white/10 backdrop-blur-xl
              border border-white/20
              rounded-2xl
              ${styles.borderGlow}
              overflow-hidden
            `}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none" />
            
            {/* Content */}
            <div className="relative p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {Icon && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                      className={`
                        flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12
                        rounded-full
                        bg-white/10 backdrop-blur-sm
                        border border-white/20
                        flex items-center justify-center
                        ${styles.glowColor}
                      `}
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${styles.iconColor}`} />
                    </motion.div>
                  )}
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-lg sm:text-xl font-semibold text-white leading-tight"
                    >
                      {title}
                    </motion.h3>
                  </div>
                </div>
                
                {showCloseButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={onClose}
                    className="
                      flex-shrink-0 w-8 h-8
                      rounded-full
                      bg-white/10 backdrop-blur-sm
                      border border-white/20
                      flex items-center justify-center
                      text-white/70 hover:text-white
                      hover:bg-white/20
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-white/30
                    "
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              
              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-sm sm:text-base leading-relaxed"
              >
                {message}
              </motion.p>
              
              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-6 flex justify-end"
              >
                <button
                  onClick={onClose}
                  className="
                    px-6 py-2.5
                    bg-white/20 backdrop-blur-sm
                    border border-white/30
                    rounded-xl
                    text-white font-medium
                    hover:bg-white/30
                    hover:border-white/40
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-white/30
                    active:scale-95
                  "
                >
                  Got it
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;