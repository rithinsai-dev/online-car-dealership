'use client';
import { useEffect, useState } from 'react';
import CarCard from './components/CarCard';
import Image from 'next/image';
import BlurText from '../BlurText/BlurText';

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

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="font-sans bg-gray-100">
      {/* Hero Section - Fixed */}
      <section className="relative h-screen w-full">
        {/* Background Image Container */}
        <div className="absolute inset-0 h-full w-full z-0">
          <Image
            src="/BG.jpg"
            alt="Background"
            fill
            priority
            className="object-cover object-center"
            quality={100}
          />
        </div>
        
        {/* Overlay and Content */}
        <div className="relative z-10 h-full flex items-center justify-center bg-black/50">
          <BlurText
            text="Welcome to Autobahn"
            delay={100}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-gray-400 text-6xl font-bold text-center"
          />
        </div>
      </section>

      {/* Available Cars Section */}
      <section className="py-16 px-6 bg-black">
        <h2 className="text-4xl font-semibold mb-8 text-center text-white">Best Cars</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {cars.slice(0, 3).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}