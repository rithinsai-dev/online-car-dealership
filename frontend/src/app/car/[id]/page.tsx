'use client'; // Ensures this is a client component
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Use `useParams` and `useRouter` for navigation

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const CarDetails = () => {
  const { id } = useParams(); // Get the car `id` from the URL
  const router = useRouter(); // Use `useRouter` for programmatic navigation
  const [car, setCar] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return; // If no `id`, do not proceed with fetching

    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cars/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }

        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <p className="text-3xl font-semibold text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-xl">{error}</p>;

  const handlePurchaseClick = () => {
    // Navigate to the purchase page, passing the car `id` as a query parameter
    router.push(`/purchase?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 flex justify-center items-center">
      <div className="w-full lg:w-3/4 bg-white flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src={car.images[0] || '/fallback-image.jpg'} // Fallback image if no image is available
            alt={`${car.make} ${car.model}`}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{car.make} {car.model}</h2>
          <p className="text-xl text-gray-600 mb-6">{car.year} | {car.transmission} | {car.fuelType}</p>
          <p className="text-3xl font-semibold text-gray-900 mb-6">{car.price} USD</p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Features:</strong> {car.features.join(', ')}
          </p>
          <button
  onClick={() => router.push(`/purchase?carId=${car._id}`)}
  className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl font-semibold"
>
  Purchase Now
</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
