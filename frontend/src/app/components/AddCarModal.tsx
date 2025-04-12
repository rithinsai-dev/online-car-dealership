import React, { useState } from 'react';

interface AddCarModalProps {
  onClose: () => void;
}

const AddCarModal = ({ onClose }: AddCarModalProps) => {
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: 0,
    price: 0,
    fuelType: '',
    transmission: '',
    features: '',
    images: '',
    availability: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carDetails),
      });

      if (!res.ok) {
        throw new Error('Failed to add car');
      }

      alert('Car added successfully!');
      onClose(); // Close the modal after success
    } catch (err) {
      console.error(err);
      alert('Error adding car');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add New Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="make" className="block text-gray-700">Make</label>
            <input
              type="text"
              id="make"
              name="make"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.make}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="model" className="block text-gray-700">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fuelType" className="block text-gray-700">Fuel Type</label>
            <input
              type="text"
              id="fuelType"
              name="fuelType"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.fuelType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="transmission" className="block text-gray-700">Transmission</label>
            <input
              type="text"
              id="transmission"
              name="transmission"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.transmission}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="features" className="block text-gray-700">Features</label>
            <input
              type="text"
              id="features"
              name="features"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.features}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700">Images</label>
            <input
              type="text"
              id="images"
              name="images"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={carDetails.images}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="availability" className="block text-gray-700">Availability</label>
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={carDetails.availability}
              onChange={(e) => setCarDetails({ ...carDetails, availability: e.target.checked })}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>

);
};

export default AddCarModal;
