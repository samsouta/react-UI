import React from 'react';
import { motion } from 'framer-motion';
import { Gem, ShoppingCart, Star, Zap } from 'lucide-react';

interface DiamondCardProps {
  packageName: string;
  description: string;
  diamondAmount: number;
  price: number;
  originalPrice?: number;
  image: string;
  isPopular?: boolean;
  bonus?: number;
}

const DiamondCard: React.FC<DiamondCardProps> = ({
  packageName,
  description,
  diamondAmount,
  price,
  originalPrice,
  image,
  isPopular = false,
  bonus = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group w-full max-w-sm mx-auto"
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3" />
            POPULAR
          </div>
        </motion.div>
      )}

      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 shadow-2xl">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">{packageName}</h3>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
              <img 
                src={image} 
                alt={packageName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Diamond Amount */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl px-4 py-2">
              <Gem className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold text-lg">{diamondAmount.toLocaleString()}</span>
            </div>
            {bonus > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl px-3 py-1"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm">+{bonus}</span>
              </motion.div>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">${price}</span>
              {originalPrice && (
                <span className="text-gray-400 line-through text-sm">${originalPrice}</span>
              )}
            </div>
            {originalPrice && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl px-3 py-1">
                <span className="text-green-400 font-semibold text-sm">
                  {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Purchase Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Purchase Now
          </motion.button>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
      </div>
    </motion.div>
  );
};

export default DiamondCard;