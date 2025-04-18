import React, { useState, useEffect } from 'react';

interface Purchase {
  _id: string;
  userName: string;
  userEmail: string;
  carId: string;
  purchaseDate: string;
  paymentMethod: string;
  status: string;
}

const PurchaseManagement = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/purchases');
        if (!res.ok) {
          throw new Error('Failed to fetch purchases');
        }
        const data = await res.json();
        setPurchases(data);
      } catch (err) {
        setError('Error fetching purchases');
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const handleUpdatePurchaseStatus = async (purchaseId: string, newStatus: 'paid' | 'shipped') => {
    try {
      const res = await fetch(`http://localhost:5000/api/purchases/${purchaseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update purchase status');
      }

      const updatedPurchase = await res.json();
      setPurchases(
        purchases.map((purchase) =>
          purchase._id === purchaseId ? updatedPurchase.purchase : purchase
        )
      );
    } catch (err) {
      setError('Error updating purchase status');
    }
  };

  if (loading) return <p className="text-center text-xl text-gray-600">Loading purchases...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  // Filter purchases to show only those with status 'paid'
  const paidPurchases = purchases.filter((purchase) => purchase.status === 'paid');

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="space-y-6">
        {paidPurchases.length > 0 ? (
          paidPurchases.map((purchase) => (
            <div
              key={purchase._id}
              className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900">{purchase.userName}</h3>
              <p className="text-gray-600">Car ID: {purchase.carId}</p>
              <p className="text-gray-600">Status: 
                <span
                  className={`font-bold ${purchase.status === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}
                >
                  {purchase.status}
                </span>
              </p>
              <p className="text-gray-600">Payment Method: {purchase.paymentMethod}</p>
              <p className="text-gray-600">Purchase Date: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>

              <button
                onClick={() => handleUpdatePurchaseStatus(purchase._id, 'shipped')}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                disabled={purchase.status === 'shipped'}
              >
                Mark as Shipped
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600">No paid purchases found.</p>
        )}
      </div>
    </div>
  );
};

export default PurchaseManagement;
