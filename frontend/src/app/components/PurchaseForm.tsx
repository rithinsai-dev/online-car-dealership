'use client';
import React, { useState } from 'react';

type Props = {
  carId: string;
};

const PurchaseForm = ({ carId }: Props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [status] = useState('paid'); // match the schema default
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const purchaseData = {
      userName,
      userEmail,
      userPhone,
      carId,
      purchaseDate,
      paymentMethod,
      status,
    };

    try {
      const res = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit purchase details');
      }

      const data = await res.json();
      console.log('Purchase successful:', data);
      setSuccess(true);
      setUserName('');
      setUserEmail('');
      setUserPhone('');
      setPurchaseDate('');
      setPaymentMethod('Credit Card');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-black text-center mb-6">Purchase Form</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">Purchase submitted successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-black mb-2">Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-black mb-2">Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-black mb-2">Phone</label>
          <input
            type="tel"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-black mb-2">Purchase Date</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-black mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Purchase'}
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
