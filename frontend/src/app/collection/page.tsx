'use client';
import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';

type Car = {
  _id: string;
  make: string;
  model: string;
  price: number;
  images: string[];
};

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [priceRange, setPriceRange] = useState<number>(1000000);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cars');
        const data = await res.json();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars
      .filter(
        (car) =>
          car.price <= priceRange &&
          `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.price - b.price);
    setFilteredCars(filtered);
  }, [priceRange, searchTerm, cars]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16 text-white text-center shadow-md">
        <h1 className="text-5xl font-extrabold mb-2">Browse Our Cars</h1>
        <p className="text-lg">Filter cars by price or search by name.</p>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Price Filter */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="block text-lg font-semibold mb-4 text-gray-700">
              Max Price: <span className="text-blue-600">${priceRange.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Search Filter */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="block text-lg font-semibold mb-4 text-gray-700">
              Search by Make or Model
            </label>
            <input
              type="text"
              placeholder="e.g., Toyota, Mustang, Tesla"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Car Grid */}
      <section className="pb-20 px-4 md:px-10">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-16">No cars match your filters.</p>
        )}
      </section>
    </div>
  );
}
