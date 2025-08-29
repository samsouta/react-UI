import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, Bell, Zap, Heart, Star } from 'lucide-react';
import Modal from './components/Modal';
import NotificationBox from './components/NotificationBox';

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    variant: 'info' as const,
    title: '',
    message: '',
    icon: Info,
  });

  const [notifications, setNotifications] = useState<Array<{
    id: number;
    isVisible: boolean;
    variant: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    icon: any;
  }>>([]);

  const [nextId, setNextId] = useState(1);

  const openModal = (type: 'info' | 'success' | 'warning' | 'error') => {
    const configs = {
      info: {
        title: 'Information',
        message: 'This is an informational modal with liquid glass styling. The glassmorphism effect creates a beautiful frosted appearance.',
        icon: Info,
      },
      success: {
        title: 'Success!',
        message: 'Your operation completed successfully. This modal demonstrates smooth animations and premium visual design.',
        icon: CheckCircle,
      },
      warning: {
        title: 'Warning',
        message: 'Please review this important warning message. The modal adapts its colors based on the variant type.',
        icon: AlertTriangle,
      },
      error: {
        title: 'Error Occurred',
        message: 'An error has occurred that requires your attention. The design maintains consistency across all variants.',
        icon: XCircle,
      },
    };

    setModalState({
      isOpen: true,
      variant: type,
      ...configs[type],
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const showNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    const configs = {
      info: {
        title: 'New Information',
        message: 'This is an info notification with glassmorphism effects.',
        icon: Bell,
      },
      success: {
        title: 'Task Completed',
        message: 'Your task has been completed successfully!',
        icon: CheckCircle,
      },
      warning: {
        title: 'Important Notice',
        message: 'Please review this important update.',
        icon: AlertTriangle,
      },
      error: {
        title: 'Action Required',
        message: 'Something needs your immediate attention.',
        icon: XCircle,
      },
    };

    const newNotification = {
      id: nextId,
      isVisible: true,
      variant: type,
      ...configs[type],
    };

    setNotifications(prev => [...prev, newNotification]);
    setNextId(prev => prev + 1);
  };

  const closeNotification = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isVisible: false } : notif
      )
    );

    // Remove from array after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
              <Zap className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Liquid Glass UI
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Experience premium glassmorphism design with smooth animations and responsive layouts
            </p>
          </div>

          {/* Demo buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <button
              onClick={() => openModal('info')}
              className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Info className="w-8 h-8 text-sky-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Info Modal</h3>
              <p className="text-white/70 text-sm">Show information dialog</p>
            </button>

            <button
              onClick={() => openModal('success')}
              className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Success Modal</h3>
              <p className="text-white/70 text-sm">Show success message</p>
            </button>

            <button
              onClick={() => openModal('warning')}
              className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Warning Modal</h3>
              <p className="text-white/70 text-sm">Show warning alert</p>
            </button>

            <button
              onClick={() => openModal('error')}
              className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <XCircle className="w-8 h-8 text-rose-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Error Modal</h3>
              <p className="text-white/70 text-sm">Show error message</p>
            </button>
          </div>

          {/* Notification demo buttons */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Notification Demos</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => showNotification('info')}
                className="px-4 py-2 bg-sky-500/20 backdrop-blur-sm border border-sky-500/30 rounded-xl text-sky-300 hover:bg-sky-500/30 transition-all duration-200"
              >
                Info Toast
              </button>
              <button
                onClick={() => showNotification('success')}
                className="px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl text-emerald-300 hover:bg-emerald-500/30 transition-all duration-200"
              >
                Success Toast
              </button>
              <button
                onClick={() => showNotification('warning')}
                className="px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-xl text-amber-300 hover:bg-amber-500/30 transition-all duration-200"
              >
                Warning Toast
              </button>
              <button
                onClick={() => showNotification('error')}
                className="px-4 py-2 bg-rose-500/20 backdrop-blur-sm border border-rose-500/30 rounded-xl text-rose-300 hover:bg-rose-500/30 transition-all duration-200"
              >
                Error Toast
              </button>
            </div>
          </div>

          {/* Features list */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <Heart className="w-6 h-6 text-rose-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Premium Design</h3>
              <p className="text-white/70 text-sm">Glassmorphism effects with beautiful blur and transparency</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <Star className="w-6 h-6 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Smooth Animations</h3>
              <p className="text-white/70 text-sm">Framer Motion powered transitions and micro-interactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        icon={modalState.icon}
        variant={modalState.variant}
      />

      {/* Notifications */}
      {notifications.map((notification) => (
        <NotificationBox
          key={notification.id}
          isVisible={notification.isVisible}
          onClose={() => closeNotification(notification.id)}
          title={notification.title}
          message={notification.message}
          icon={notification.icon}
          variant={notification.variant}
        />
      ))}
    </div>
  );
}

export default App;