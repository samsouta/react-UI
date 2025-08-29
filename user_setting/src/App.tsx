import React, { useState } from 'react';
import { User, Phone, Package, CreditCard, Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  method: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Order {
  product_id: string;
  total_price: number;
  payment_status: 'completed' | 'pending' | 'failed';
  transaction: Transaction;
}

const mockUserData = {
  username: 'samsouta',
  phone: '+1 (555) 123-4567'
};

const mockOrders: Order[] = [
  {
    product_id: 'PRD-001',
    total_price: 149.99,
    payment_status: 'completed',
    transaction: {
      id: 'TXN-2024-001',
      user_id: 'USR-samsouta',
      amount: 149.99,
      method: 'Credit Card',
      description: 'Premium Wireless Headphones',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:31:00Z'
    }
  },
  {
    product_id: 'PRD-002',
    total_price: 79.50,
    payment_status: 'completed',
    transaction: {
      id: 'TXN-2024-002',
      user_id: 'USR-samsouta',
      amount: 79.50,
      method: 'PayPal',
      description: 'Smart Phone Case',
      created_at: '2024-01-12T14:22:00Z',
      updated_at: '2024-01-12T14:23:00Z'
    }
  },
  {
    product_id: 'PRD-003',
    total_price: 299.99,
    payment_status: 'pending',
    transaction: {
      id: 'TXN-2024-003',
      user_id: 'USR-samsouta',
      amount: 299.99,
      method: 'Bank Transfer',
      description: 'Mechanical Gaming Keyboard',
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-01-10T09:15:00Z'
    }
  },
  {
    product_id: 'PRD-004',
    total_price: 45.99,
    payment_status: 'failed',
    transaction: {
      id: 'TXN-2024-004',
      user_id: 'USR-samsouta',
      amount: 45.99,
      method: 'Credit Card',
      description: 'USB-C Cable Set',
      created_at: '2024-01-08T16:45:00Z',
      updated_at: '2024-01-08T16:46:00Z'
    }
  },
  {
    product_id: 'PRD-005',
    total_price: 189.99,
    payment_status: 'completed',
    transaction: {
      id: 'TXN-2024-005',
      user_id: 'USR-samsouta',
      amount: 189.99,
      method: 'Apple Pay',
      description: 'Wireless Charging Station',
      created_at: '2024-01-05T11:20:00Z',
      updated_at: '2024-01-05T11:21:00Z'
    }
  }
];

const PaymentStatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          className: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-xs md:text-xs',
          label: 'Completed'
        };
      case 'pending':
        return {
          icon: Clock,
          className: 'bg-amber-500/20 text-amber-300 border-amber-400/30 text-xs md:text-xs',
          label: 'Pending'
        };
      case 'failed':
        return {
          icon: XCircle,
          className: 'bg-red-500/20 text-red-300 border-red-400/30 text-xs md:text-xs',
          label: 'Failed'
        };
      default:
        return {
          icon: Clock,
          className: 'bg-gray-500/20 text-gray-300 border-gray-400/30 text-xs md:text-xs',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full font-medium border backdrop-blur-sm ${config.className}`}>
      <Icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
      <span className="hidden sm:inline">{config.label}</span>
      <span className="sm:hidden">
        {status === 'completed' ? '✓' : status === 'pending' ? '⏳' : '✗'}
      </span>
    </span>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

function App() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 md:p-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
            User Settings
          </h1>
          <p className="text-blue-200/80 text-lg">Manage your profile and view order history</p>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-blue-200 mb-2">Username</label>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  <User className="w-5 h-5 text-blue-300" />
                  <span className="text-white font-medium">{mockUserData.username}</span>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-blue-200 mb-2">Phone Number</label>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  <Phone className="w-5 h-5 text-blue-300" />
                  <span className="text-white font-medium">{mockUserData.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/20">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Order History</h2>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold text-blue-200 min-w-[100px]">Product ID</th>
                    <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold text-blue-200 min-w-[150px]">Description</th>
                    <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold text-blue-200 min-w-[100px]">Price</th>
                    <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold text-blue-200 min-w-[120px]">Status</th>
                    <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold text-blue-200 min-w-[140px]">Date</th>
                    <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold text-blue-200 min-w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order, index) => (
                    <tr key={order.transaction.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                      <td className="p-2 md:p-4 text-white font-mono text-xs md:text-sm">{order.product_id}</td>
                      <td className="p-2 md:p-4 text-white text-xs md:text-sm">
                        <div className="max-w-[120px] md:max-w-none truncate md:whitespace-normal" title={order.transaction.description}>
                          {order.transaction.description}
                        </div>
                      </td>
                      <td className="p-2 md:p-4 text-white font-semibold text-xs md:text-sm">{formatCurrency(order.total_price)}</td>
                      <td className="p-2 md:p-4">
                        <PaymentStatusBadge status={order.payment_status} />
                      </td>
                      <td className="p-2 md:p-4 text-blue-200 text-xs md:text-sm">
                        <div className="hidden md:block">{formatDate(order.transaction.created_at)}</div>
                        <div className="md:hidden">
                          {new Date(order.transaction.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="p-2 md:p-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-2 md:px-3 py-1 md:py-1.5 text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-400/30 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap"
                        >
                          <span className="hidden md:inline">View Details</span>
                          <span className="md:hidden">View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transaction Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Transaction Details</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Transaction ID</label>
                      <p className="text-white font-mono text-sm bg-white/5 p-3 rounded-xl border border-white/10">{selectedOrder.transaction.id}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">User ID</label>
                      <p className="text-white font-mono text-sm bg-white/5 p-3 rounded-xl border border-white/10">{selectedOrder.transaction.user_id}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Amount</label>
                      <p className="text-white font-semibold text-lg bg-white/5 p-3 rounded-xl border border-white/10">{formatCurrency(selectedOrder.transaction.amount)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Payment Method</label>
                      <p className="text-white bg-white/5 p-3 rounded-xl border border-white/10">{selectedOrder.transaction.method}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Status</label>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <PaymentStatusBadge status={selectedOrder.payment_status} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Product ID</label>
                      <p className="text-white font-mono text-sm bg-white/5 p-3 rounded-xl border border-white/10">{selectedOrder.product_id}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Description</label>
                  <p className="text-white bg-white/5 p-3 rounded-xl border border-white/10">{selectedOrder.transaction.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Created At</label>
                    <div className="flex items-center gap-2 text-white bg-white/5 p-3 rounded-xl border border-white/10">
                      <Calendar className="w-4 h-4 text-blue-300" />
                      <span className="text-sm">{formatDate(selectedOrder.transaction.created_at)}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Updated At</label>
                    <div className="flex items-center gap-2 text-white bg-white/5 p-3 rounded-xl border border-white/10">
                      <Calendar className="w-4 h-4 text-blue-300" />
                      <span className="text-sm">{formatDate(selectedOrder.transaction.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;