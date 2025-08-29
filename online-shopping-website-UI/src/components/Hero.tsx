import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)",
            "radial-gradient(circle, rgba(255,255,255,0.2) 100%, transparent 60%)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Modern Living
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Curated collection of premium lifestyle products for your contemporary space
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};