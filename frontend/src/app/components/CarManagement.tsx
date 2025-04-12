import React, { useEffect, useState } from 'react';

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  features: string[];
  images: string[];
  availability: boolean;
}

const CarManagement = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cars');
        if (!res.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError('Error fetching cars');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleDeleteCar = async (carId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cars/${carId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete car');
      }
      setCars(cars.filter((car) => car._id !== carId));
    } catch (err) {
      setError('Error deleting car');
    }
  };

  const handleUpdateCar = async (carId: string, updatedCar: Partial<Car>) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cars/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar),
      });
      if (!res.ok) {
        throw new Error('Failed to update car');
      }
      const data = await res.json();
      setCars(cars.map((car) => (car._id === carId ? data.car : car)));
      setEditingCar(null); // Reset editing form
    } catch (err) {
      setError('Error updating car');
    }
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Car) => {
    if (editingCar) {
      setEditingCar({
        ...editingCar,
        [field]: e.target.value,
      });
    }
  };

  if (loading) return <p className="text-center text-xl text-gray-600">Loading cars...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {cars.map((car) => (
        <div key={car._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <img
            src={car.images[0] || '/fallback-image.jpg'}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">{car.make} {car.model}</h3>
          <p className="text-gray-600">{car.year} | {car.fuelType} | {car.transmission}</p>
          <p className="text-green-600 font-bold mt-2">{car.price} USD</p>

          {editingCar && editingCar._id === car._id ? (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-800">Edit Car</h4>
              <input
                type="text"
                value={editingCar.make}
                onChange={(e) => handleInputChange(e, 'make')}
                placeholder="Make"
                className="w-full border p-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={editingCar.model}
                onChange={(e) => handleInputChange(e, 'model')}
                placeholder="Model"
                className="w-full border p-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={editingCar.price}
                onChange={(e) => handleInputChange(e, 'price')}
                placeholder="Price"
                className="w-full border p-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => handleUpdateCar(car._id, editingCar)}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  onClick={() => setEditingCar(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex justify-between">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                onClick={() => handleEditCar(car)}
              >
                Edit Car
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleDeleteCar(car._id)}
              >
                Delete Car
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarManagement;
