import React, { useState } from 'react';
import VerificationModal from './components/VerificationModal';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          {/* Dark Mode Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/20 transition-all shadow-lg"
            >
              {isDarkMode ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-gray-700" size={24} />}
            </button>
          </div>

          {/* Welcome Content */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 max-w-md shadow-2xl">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Liquid Glass UI
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Experience beautiful glassmorphism design with our verification system.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Open Verification
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <VerificationModal 
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App