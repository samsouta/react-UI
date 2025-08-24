export interface Transaction {
  id: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: Date;
}

export interface WalletBalance {
  current: number;
  currency: string;
  lastUpdated: Date;
}

export type PaymentMethod = {
  id: string;
  name: string;
  icon: string;
};