import { useState } from 'react';
import { Mail, Phone, Send, Shield, X, Check } from 'lucide-react';

interface VerificationModalProps {
  onClose: () => void;
}

type Step = 'input' | 'verification';

function VerificationModal({ onClose }: VerificationModalProps) {
  const [step, setStep] = useState<Step>('input');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^[\+]?[1-9][\d]{0,15}$/;
    return regex.test(phone.replace(/\s/g, ''));
  };

  const handleSendCode = async () => {
    setErrors({});
    
    if (contactMethod === 'email' && !email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (contactMethod === 'phone' && !phone) {
      setErrors({ phone: 'Phone number is required' });
      return;
    }
    
    if (contactMethod === 'email' && !validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    if (contactMethod === 'phone' && !validatePhone(phone)) {
      setErrors({ phone: 'Please enter a valid phone number' });
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Code sent to:', contactMethod === 'email' ? email : phone);
    setStep('verification');
    setIsSubmitting(false);
  };

  const handleVerify = async () => {
    setErrors({});
    
    if (!verificationCode) {
      setErrors({ code: 'Verification code is required' });
      return;
    }
    
    if (verificationCode.length < 6) {
      setErrors({ code: 'Please enter the complete verification code' });
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Verification successful for code:', verificationCode);
    setIsSubmitting(false);
    onClose();
  };

  const handleBack = () => {
    setStep('input');
    setVerificationCode('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-all text-gray-700 dark:text-gray-300"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {step === 'input' ? <Send className="text-white" size={24} /> : <Shield className="text-white" size={24} />}
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {step === 'input' ? 'Verify Your Identity' : 'Enter Verification Code'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {step === 'input' 
              ? 'We\'ll send you a verification code to confirm your identity'
              : `We've sent a 6-digit code to your ${contactMethod === 'email' ? 'email' : 'phone'}`
            }
          </p>
        </div>

        {step === 'input' ? (
          <div className="space-y-6">
            {/* Contact Method Toggle */}
            <div className="flex bg-white/20 dark:bg-white/10 rounded-2xl p-1">
              <button
                onClick={() => setContactMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                  contactMethod === 'email'
                    ? 'bg-white/30 dark:bg-white/20 text-blue-600 dark:text-blue-400 shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                }`}
              >
                <Mail size={18} />
                Email
              </button>
              <button
                onClick={() => setContactMethod('phone')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                  contactMethod === 'phone'
                    ? 'bg-white/30 dark:bg-white/20 text-blue-600 dark:text-blue-400 shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                }`}
              >
                <Phone size={18} />
                Phone
              </button>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {contactMethod === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              )}
            </div>

            {/* Send Code Button */}
            <button
              onClick={handleSendCode}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Code
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Verification Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 text-center tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Verify
                </>
              )}
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="w-full bg-white/20 dark:bg-white/10 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 dark:hover:bg-white/20 transition-all"
            >
              Back to Input
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the code?{' '}
                <button
                  onClick={handleSendCode}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerificationModal;