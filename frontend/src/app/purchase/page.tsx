'use client';
import PurchaseForm from '../components/PurchaseForm';
import { useSearchParams } from 'next/navigation';

export default function PurchasePage() {
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId') || '';

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <PurchaseForm carId={carId} />
    </div>
  );
}
