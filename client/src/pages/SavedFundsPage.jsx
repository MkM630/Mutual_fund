import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';

const SavedFundsPage = () => {
  const [savedFunds, setSavedFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingFundId, setRemovingFundId] = useState(null);
  
  const { user } = useContext(AuthContext);

  const fetchSavedFunds = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/api/funds/saved/all');
      setSavedFunds(res.data);
    } catch (err) {
      console.error('Error fetching saved funds:', err);
      setError(err.response?.data?.msg || 'Failed to fetch saved funds. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedFunds();
    } else {
      setSavedFunds([]);
      setLoading(false);
    }
  }, [user]);

  const removeFund = async (fundId) => {
    try {
      setRemovingFundId(fundId);
      setError('');
      await axios.delete(`/api/funds/saved/${fundId}`);
      setSavedFunds(savedFunds.filter(fund => fund.fundId !== fundId));
    } catch (err) {
      console.error('Error removing fund:', err);
      setError(err.response?.data?.msg || 'Failed to remove fund. Please try again.');
    } finally {
      setRemovingFundId(null);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Saved Funds</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {savedFunds.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">You haven't saved any funds yet</div>
          <Link 
            to="/" 
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Funds
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {savedFunds.map(fund => (
              <li key={fund.fundId} className="px-6 py-4 hover:bg-gray-50 flex justify-between items-center">
                <div>
                  <Link 
                    to={`/fund/${fund.fundId}`} 
                    className="font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    {fund.name}
                  </Link>
                  <div className="text-gray-500 text-sm">{fund.fundId}</div>
                </div>
                <button
                  onClick={() => removeFund(fund.fundId)}
                  disabled={removingFundId === fund.fundId}
                  className={`px-3 py-1 rounded ${removingFundId === fund.fundId 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                >
                  {removingFundId === fund.fundId ? 'Removing...' : 'Remove'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavedFundsPage;