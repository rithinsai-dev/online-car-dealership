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

  // Check if the car has images and use the first one (ensure it’s valid)
  const imageUrl = car.images && car.images[0] && car.images[0].trim() !== "" ? car.images[0] : null;

  // Log the image URL to verify it's correct
  console.log('Image URL:', imageUrl);

  return (
    <Link href={`/car/${car._id}`}>
  <div className="bg-white shadow-lg rounded-xl overflow-hidden w-80 md:w-[24rem] mx-auto cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={`${car.make} ${car.model}`}
        className="w-full h-64 object-cover rounded-t-xl transition-transform duration-300 ease-in-out"
        onError={(e) => {
          console.error('Error loading image:', e.currentTarget.src);
          e.currentTarget.src = '/default-car.jpg';
        }}
      />
    ) : (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-t-xl">
        <span className="text-gray-500">No Image Available</span>
      </div>
    )}
    <div className="p-6 space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800 truncate">
        {car.make} {car.model}
      </h3>
      <p className="text-xl font-medium text-green-600">
        ${formatPrice(car.price)} USD
      </p>
    </div>
  </div>
</Link>

  );
};

export default CarCard;
