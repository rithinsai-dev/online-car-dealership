import React from 'react';
import Link from 'next/link';

interface CarCardProps {
  car: {
    _id: string;
    make: string;
    model: string;
    price: number;
    images: string[]; // Array of image URLs
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString(); // Formats the price with commas
  };

  return (
    <Link href={`/car/${car._id}`}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-xs mx-auto cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
        <img
          src={car.images[0] || '/default-car.jpg'} // Display the first image URL, with a fallback
          alt={`${car.make} ${car.model}`}
          className="w-full h-64 object-cover rounded-t-xl transition-transform duration-300 ease-in-out"
        />
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 truncate">{car.make} {car.model}</h3>
          <p className="text-xl font-medium text-green-600">${formatPrice(car.price)} USD</p>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
