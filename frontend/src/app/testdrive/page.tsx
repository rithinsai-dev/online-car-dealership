'use client';  // Ensures this is a client-side component

import React, { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const TestDriveBookingForm = () => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [status] = useState<string>('pending');  // Status is hardcoded as "pending"
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const bookingData = {
      userName,
      userEmail,
      userPhone,
      date,
      timeSlot,
      status,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/test-drives`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setSuccess(true);
      setUserName('');
      setUserEmail('');
      setUserPhone('');
      setDate('');
      setTimeSlot('');
    } catch (error) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full p-10 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">Book a Test Drive</h2>

      {success !== null && (
        <p className={`text-center ${success ? 'text-green-600' : 'text-red-600'} mb-6`}>
          {success ? 'Booking successful! We will contact you soon.' : 'There was an error with your booking. Please try again.'}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-5">
          <label htmlFor="userName" className="block text-lg font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full px-5 py-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label htmlFor="userEmail" className="block text-lg font-medium text-gray-700">Your Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="w-full px-5 py-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Phone Input */}
        <div className="mb-5">
          <label htmlFor="userPhone" className="block text-lg font-medium text-gray-700">Your Phone Number</label>
          <input
            type="tel"
            id="userPhone"
            name="userPhone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            required
            className="w-full px-5 py-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Date Input */}
        <div className="mb-5">
          <label htmlFor="date" className="block text-lg font-medium text-gray-700">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-5 py-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Time Slot Input */}
        <div className="mb-5">
          <label htmlFor="timeSlot" className="block text-lg font-medium text-gray-700">Preferred Time Slot</label>
          <input
            type="text"
            id="timeSlot"
            name="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className="w-full px-5 py-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {loading ? 'Booking...' : 'Book Test Drive'}
        </button>
      </form>
    </div>
      </div>
  );
};

export default TestDriveBookingForm;
