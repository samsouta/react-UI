import React, { useState, useEffect } from 'react';
import { Check, Package, CreditCard, ArrowRight, Sparkles, Sun, Moon } from 'lucide-react';

function App() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const orderDetails = {
    orderId: 'ORD-2025-001247',
    productName: 'Premium Wireless Headphones',
    productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
    totalPrice: 299.99,
    estimatedDelivery: 'January 15, 2025'
  };

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
    }, 3000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800' 
        : 'bg-gradient-to-br from-purple-100 via-sky-50 to-rose-100'
    } p-4 sm:p-6 lg:p-8`}>
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-sky-400/10 to-purple-400/10' 
            : 'bg-gradient-to-br from-sky-400/20 to-purple-400/20'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-tr from-rose-400/10 to-amber-400/10' 
            : 'bg-gradient-to-tr from-rose-400/20 to-amber-400/20'
        }`}></div>
      </div>

      {/* Theme Toggle */}
      <div className="relative max-w-md mx-auto mb-6">
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-2xl backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                : 'bg-white/70 border-white/30 text-gray-700 hover:bg-white/90'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="relative max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Order Confirmation
          </h1>
          <p className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your order has been placed successfully!
          </p>
        </div>

        {/* Main Card */}
        <div className={`backdrop-blur-md border rounded-3xl shadow-xl overflow-hidden transition-all duration-300 ${
          isDarkMode 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/70 border-white/20'
        }`}>
          
          {/* Order ID Section */}
          <div className={`p-6 pb-4 border-b transition-colors duration-300 ${
            isDarkMode ? 'border-white/10' : 'border-white/10'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Order ID
                </p>
                <p className={`text-lg font-bold font-mono tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {orderDetails.orderId}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="p-6 pb-4">
            <div className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/50 border-white/20'
            }`}>
              <img
                src={orderDetails.productImage}
                alt={orderDetails.productName}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="px-6 pb-4">
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {orderDetails.productName}
            </h3>
            <div className={`flex items-center text-sm mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Package className="w-4 h-4 mr-2" />
              <span>Estimated delivery: {orderDetails.estimatedDelivery}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="px-6 pb-6">
            <div className={`backdrop-blur-sm bg-gradient-to-r border rounded-2xl p-4 transition-all duration-300 ${
              isDarkMode 
                ? 'from-sky-400/5 to-purple-400/5 border-white/10' 
                : 'from-sky-400/10 to-purple-400/10 border-white/20'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <span className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Total Amount
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-sky-500">
                    ${orderDetails.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="p-6 pt-0">
            <button
              onClick={handleConfirmOrder}
              disabled={isConfirmed}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-white shadow-lg transform transition-all duration-300 flex items-center justify-center space-x-2 ${
                isConfirmed
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-95'
                  : 'bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 hover:scale-105 active:scale-95 hover:shadow-xl'
              }`}
            >
              {isConfirmed ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Order Confirmed!</span>
                </>
              ) : (
                <>
                  <span>Confirm Order</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {isConfirmed && (
          <div className={`mt-6 backdrop-blur-md border rounded-2xl p-4 text-center animate-pulse transition-all duration-300 ${
            isDarkMode 
              ? 'bg-emerald-500/10 border-emerald-400/20' 
              : 'bg-emerald-100/80 border-emerald-200/50'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mr-3 shadow-lg">
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
              }`}>
                Thank you! Your order is being processed.
              </p>
            </div>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              You'll receive a confirmation email shortly.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;