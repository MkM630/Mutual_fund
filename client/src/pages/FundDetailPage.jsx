import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { FiArrowLeft, FiStar } from 'react-icons/fi';

const FundDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFund = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/funds/${id}`);
        setFund(res.data);
      } catch (err) {
        setError('Failed to fetch fund details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFund();
  }, [id]);
  
  // Separate effect for checking if fund is saved
  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) {
        setIsSaved(false);
        return;
      }
      
      try {
        // Use the dedicated endpoint to check if a fund is saved
        const res = await axios.get(`/api/funds/saved/check/${id}`);
        setIsSaved(res.data.isSaved);
      } catch (err) {
        console.error('Error checking if fund is saved:', err);
        // Don't set an error message for this, as it's not critical
      }
    };
    
    checkIfSaved();
  }, [id, user]);

  const toggleSaveFund = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      if (isSaved) {
        await axios.delete(`/api/funds/saved/${id}`);
        setIsSaved(false);
      } else {
        await axios.post('/api/funds/save', {
          fundId: id,
          name: fund?.meta?.scheme_name || `Fund ${id}`
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error updating saved funds:', err);
      setError(err.response?.data?.msg || 'Failed to update saved funds. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  
  if (error || !fund) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Fund not found'}
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FiArrowLeft className="mr-2" /> Back to search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to results
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {fund.meta.scheme_name}
            </h1>
            <p className="text-gray-600">{fund.meta.scheme_category}</p>
          </div>
          <button
            onClick={toggleSaveFund}
            disabled={saving}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isSaved 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiStar className={`mr-2 ${isSaved ? 'fill-current text-yellow-500' : ''}`} />
            {isSaved ? 'Saved' : 'Save Fund'}
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Fund Details</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Fund House:</span>
                  <span className="font-medium">{fund.meta.fund_house}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Scheme Code:</span>
                  <span className="font-medium">{fund.meta.scheme_code}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{fund.meta.scheme_category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{fund.meta.scheme_type}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Performance</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Latest NAV:</span>
                  <span className="font-medium">
                    ₹{fund.data[0]?.nav || 'N/A'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">1-Year Return:</span>
                  <span className="font-medium">
                    {fund.data[0]?.returns_1yr || 'N/A'}%
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">3-Year Return:</span>
                  <span className="font-medium">
                    {fund.data[0]?.returns_3yr || 'N/A'}%
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">5-Year Return:</span>
                  <span className="font-medium">
                    {fund.data[0]?.returns_5yr || 'N/A'}%
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Historical NAV</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NAV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fund.data.slice(0, 10).map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.nav}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetailPage;