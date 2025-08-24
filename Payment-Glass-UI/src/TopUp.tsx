import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { GlassCard } from './components/GlassCard';
import { StatusBadge } from './components/StatusBadge';
import { LoadingButton } from './components/LoadingButton';
import { mockWalletBalance, mockPaymentMethods, mockTransactions, mockLatestTransaction } from './data/mockData';
import { Transaction } from './types/topup';
import { 
  Moon, 
  Sun, 
  Wallet, 
  TrendingUp,
  Calendar,
  CreditCard,
  Activity
} from 'lucide-react';

export const TopUp = () => {
  const { theme, toggleTheme } = useTheme();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [latestTransaction] = useState<Transaction>(mockLatestTransaction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !paymentMethod) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    
    // Reset form
    setAmount('');
    setPaymentMethod('');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`
      min-h-screen transition-all duration-500 relative overflow-hidden
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }
    `}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`
          absolute top-1/4 -left-40 w-80 h-80 rounded-full opacity-30 blur-3xl animate-pulse
          ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-300'}
        `} />
        <div className={`
          absolute bottom-1/4 -right-40 w-80 h-80 rounded-full opacity-30 blur-3xl animate-pulse
          ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-300'}
        `} style={{ animationDelay: '1s' }} />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`
          fixed top-6 right-6 z-50 p-3 rounded-full
          backdrop-blur-xl bg-white/10 dark:bg-black/10
          border border-white/20 dark:border-white/10
          shadow-lg hover:shadow-xl transition-all duration-300
          hover:scale-110 active:scale-95
        `}
      >
        {theme === 'dark' ? (
          <Sun className="text-yellow-400" size={24} />
        ) : (
          <Moon className="text-slate-700" size={24} />
        )}
      </button>

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Floating Balance Card */}
        <GlassCard glowColor="purple" className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <Wallet className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm opacity-70 dark:text-white/70 text-gray-600">
                  Current Balance
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(mockWalletBalance.current)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+12.5%</span>
              </div>
              <p className="text-xs opacity-70 dark:text-white/70 text-gray-600">
                vs last month
              </p>
            </div>
          </div>
        </GlassCard>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top-Up Form Section */}
          <div className="space-y-6">
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white text-gray-900">
                <Activity className="text-blue-500" />
                Top-Up Wallet
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white/80 text-gray-700">
                    Amount to Top-Up
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className={`
                      w-full px-4 py-3 rounded-xl border
                      backdrop-blur-xl bg-white/10 dark:bg-black/10
                      border-white/20 dark:border-white/10
                      focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                      placeholder-gray-500 dark:placeholder-gray-400
                      dark:text-white text-gray-900
                      transition-all duration-300
                    `}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white/80 text-gray-700">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={`
                      w-full px-4 py-3 rounded-xl border
                      backdrop-blur-xl bg-white/10 dark:bg-black/10
                      border-white/20 dark:border-white/10
                      focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                      dark:text-white text-gray-900
                      transition-all duration-300
                    `}
                  >
                    <option value="">Select payment method</option>
                    {mockPaymentMethods.map((method) => (
                      <option 
                        key={method.id} 
                        value={method.name}
                        className="bg-white dark:bg-gray-800"
                      >
                        {method.icon} {method.name}
                      </option>
                    ))}
                  </select>
                </div>

                <LoadingButton
                  loading={loading}
                  disabled={!amount || !paymentMethod}
                  className="w-full"
                >
                  {loading ? 'Processing...' : 'Submit Top-Up'}
                </LoadingButton>
              </form>
            </GlassCard>

            {/* Latest Transaction Status */}
            <GlassCard 
              glowColor={latestTransaction.status === 'pending' ? 'yellow' : 
                        latestTransaction.status === 'confirmed' ? 'green' : 'red'} 
              className="p-6"
            >
              <h3 className="text-lg font-semibold mb-4 dark:text-white text-gray-900">
                Latest Transaction
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="dark:text-white/70 text-gray-600">Amount</span>
                  <span className="font-bold dark:text-white text-gray-900">
                    {formatCurrency(latestTransaction.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="dark:text-white/70 text-gray-600">Method</span>
                  <span className="dark:text-white text-gray-900">
                    {latestTransaction.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="dark:text-white/70 text-gray-600">Status</span>
                  <StatusBadge status={latestTransaction.status} animated />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Transaction History */}
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white text-gray-900">
              <Calendar className="text-purple-500" />
              Transaction History
            </h2>

            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`
                    p-4 rounded-xl backdrop-blur-xl
                    bg-white/5 dark:bg-black/5 border border-white/10
                    hover:bg-white/10 dark:hover:bg-black/10
                    transition-all duration-300 hover:scale-[1.02]
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-blue-400" size={20} />
                      <div>
                        <p className="font-semibold dark:text-white text-gray-900">
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm dark:text-white/60 text-gray-500">
                          {transaction.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={transaction.status} />
                      <p className="text-xs dark:text-white/60 text-gray-500 mt-1">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};