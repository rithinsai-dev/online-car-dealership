import React, { useEffect, useState } from 'react';

interface TestDrive {
  _id: string;
  carId: string;
  userName: string;
  userEmail: string;
  status: string; // 'pending' or 'completed'
}

const TestDriveManagement = () => {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestDrives = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/test-drives');
        if (!res.ok) {
          throw new Error('Failed to fetch test drives');
        }
        const data = await res.json();
        setTestDrives(data.filter((testDrive: TestDrive) => testDrive.status === 'pending'));
      } catch (err) {
        setError('Error fetching test drives');
      } finally {
        setLoading(false);
      }
    };
    fetchTestDrives();
  }, []);

  const handleCompleteTestDrive = async (testDriveId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/test-drives/${testDriveId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });
      if (!res.ok) {
        throw new Error('Failed to complete test drive');
      }
      setTestDrives(
        testDrives.map((testDrive) =>
          testDrive._id === testDriveId ? { ...testDrive, status: 'completed' } : testDrive
        )
      );
    } catch (err) {
      setError('Error completing test drive');
    }
  };

  if (loading) return <p className="text-center text-xl text-gray-600">Loading test drives...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {testDrives.map((testDrive) => (
        <div key={testDrive._id} className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-gray-900">{testDrive.userName}</h3>
          <p className="text-gray-600">Car ID: {testDrive.carId}</p>
          <p className="text-gray-600">Status: 
            <span className={`font-bold ${testDrive.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
              {testDrive.status}
            </span>
          </p>
          {testDrive.status === 'pending' && (
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              onClick={() => handleCompleteTestDrive(testDrive._id)}
            >
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TestDriveManagement;
