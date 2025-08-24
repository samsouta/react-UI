import { Transaction, WalletBalance, PaymentMethod } from '../types/topup';

export const mockWalletBalance: WalletBalance = {
  current: 2847.50,
  currency: 'USD',
  lastUpdated: new Date()
};

export const mockPaymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
  { id: 'paypal', name: 'PayPal', icon: '💰' },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿' }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-01-27',
    amount: 500.00,
    paymentMethod: 'Credit Card',
    status: 'confirmed',
    timestamp: new Date('2025-01-27T10:30:00')
  },
  {
    id: '2',
    date: '2025-01-26',
    amount: 250.00,
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    timestamp: new Date('2025-01-26T15:45:00')
  },
  {
    id: '3',
    date: '2025-01-25',
    amount: 100.00,
    paymentMethod: 'PayPal',
    status: 'failed',
    timestamp: new Date('2025-01-25T09:20:00')
  },
  {
    id: '4',
    date: '2025-01-24',
    amount: 750.00,
    paymentMethod: 'Cryptocurrency',
    status: 'confirmed',
    timestamp: new Date('2025-01-24T14:10:00')
  },
  {
    id: '5',
    date: '2025-01-23',
    amount: 300.00,
    paymentMethod: 'Credit Card',
    status: 'confirmed',
    timestamp: new Date('2025-01-23T11:55:00')
  }
];

export const mockLatestTransaction: Transaction = mockTransactions[1]; // Pending transaction