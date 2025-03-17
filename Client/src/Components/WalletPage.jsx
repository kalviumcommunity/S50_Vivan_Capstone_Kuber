import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, CurrencyDollarIcon, IdentificationIcon, LockClosedIcon, QrCodeIcon } from '@heroicons/react/24/outline';

const WalletPage = () => {
  const navigate = useNavigate();
  const [balance] = useState(2450.75);
  const [transactions] = useState([
    { id: 1, type: 'credit', amount: 500, description: 'Deposit from Bank', date: '2024-02-15' },
    { id: 2, type: 'debit', amount: 150, description: 'Purchase at Store', date: '2024-02-14' },
    { id: 3, type: 'credit', amount: 200, description: 'Referral Bonus', date: '2024-02-13' },
  ]);

  const [user] = useState({
    name: 'John Doe',
    email: 'john@kuber.com',
    verified: true,
    walletId: 'KUW-7845-9521-3698'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Digital Wallet</h1>
            <p className="text-gray-600 mt-2">Manage your funds and transactions</p>
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="mt-4 md:mt-0 flex items-center text-blue-600 hover:text-blue-800"
          >
            <IdentificationIcon className="h-5 w-5 mr-2" />
            Account Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Balance & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Balance Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Current Balance</h2>
                <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                ₹{balance.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <LockClosedIcon className="h-4 w-4 mr-2" />
                <span>Secure SSL Connection</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition">
                  <div className="flex items-center">
                    <ArrowDownTrayIcon className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="font-medium">Add Money</span>
                  </div>
                  <QrCodeIcon className="h-5 w-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition">
                  <div className="flex items-center">
                    <ArrowUpTrayIcon className="h-6 w-6 text-green-600 mr-3" />
                    <span className="font-medium">Withdraw Funds</span>
                  </div>
                </button>
              </div>
            </div>

            {/* User Profile */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold text-xl">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wallet ID:</span>
                  <span className="text-gray-900">{user.walletId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verification:</span>
                  <span className={`${user.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <button 
                  onClick={() => navigate('/transactions')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
                  >
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownTrayIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpTrayIcon className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;