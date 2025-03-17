import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userCoupons, setUserCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login');
          return;
        }

        // Fetch user data
        const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const user = await userResponse.json();

        // Fetch user's coupons
        const couponsResponse = await fetch('http://localhost:3000/coupons');
        if (!couponsResponse.ok) throw new Error('Failed to fetch coupons');
        const allCoupons = await couponsResponse.json();
        
        const filteredCoupons = allCoupons.filter(coupon => 
          coupon.userId === userId
        );

        setUserData(user);
        setUserCoupons(filteredCoupons);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p className="text-xl mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {userData.User_Name}'s Profile
              </h1>
              <p className="mt-2 text-gray-600">{userData.Email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* User Details Section */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">User ID</h3>
                <p className="text-gray-900 break-all">{userData._id}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Google ID</h3>
                <p className="text-gray-900 break-all">
                  {userData.google_id || 'Not connected'}
                </p>
              </div>
            </div>
          </div>

          {/* Coupons Section */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">Your Coupons ({userCoupons.length})</h2>
            
            {userCoupons.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No coupons created yet
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {userCoupons.map((coupon) => (
                  <div key={coupon._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{coupon.Brand_Name}</h3>
                        <p className="text-sm text-gray-500">{coupon.Category}</p>
                      </div>
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                        ${coupon.Price}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Expiry Date:</span>
                        <span className="text-sm text-gray-600">{coupon.Date}</span>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Coupon Code:</p>
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                          <code className="font-mono">{coupon.Code}</code>
                          <button
                            onClick={() => navigator.clipboard.writeText(coupon.Code)}
                            className="text-amber-600 hover:text-amber-700 text-sm"
                          >
                            Copy
                          </button>
                        </div>
                      </div>

                      {coupon.Link && (
                        <a
                          href={coupon.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-amber-600 hover:text-amber-700 text-sm"
                        >
                          Visit Store Website →
                        </a>
                      )}
                    </div>

                    {coupon.image && (
                      <img
                        src={coupon.image}
                        alt={coupon.Brand_Name}
                        className="mt-4 rounded-lg w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;