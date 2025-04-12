'use client';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon
import CarManagement from '../components/CarManagement';
import TestDriveManagement from '../components/TestDriveManagement';
import PurchaseManagement from '../components/PurchaseManagement';
import AddCarModal from '../components/AddCarModal'; // Assuming you'll create this modal

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Admin Dashboard</h1>

        {/* Plus Icon to Open Modal */}
        <button
          onClick={toggleModal}
          className="absolute top-5 left-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaPlus size={24} />
        </button>

        {/* Modal for Adding New Car */}
        {isModalOpen && <AddCarModal onClose={toggleModal} />}

        {/* Car Management Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Car Management</h2>
          <CarManagement />
        </section>

        {/* Test Drive Management Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Test Drive Management</h2>
          <TestDriveManagement />
        </section>

        {/* Purchase Management Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-black">Purchase Management</h2>
          <PurchaseManagement />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
