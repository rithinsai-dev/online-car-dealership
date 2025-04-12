'use client';
import { useEffect, useState } from 'react';
import CarCard from './components/CarCard';

type Car = {
  _id: string;
  make: string;
  model: string;
  price: number;
  images: string[];
};

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cars');
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="font-sans bg-gray-100">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-700 text-white relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-6xl font-bold z-10 text-center">Welcome to Autobahn</h1>
      </section>

      {/* Available Cars Section */}
      <section className="py-16 px-6 bg-gray-900">
        <h2 className="text-4xl font-semibold mb-8 text-center text-white">Available Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}
