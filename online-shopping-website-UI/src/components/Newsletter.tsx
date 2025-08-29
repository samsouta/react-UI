import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for exclusive offers and updates</p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full text-gray-800 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};