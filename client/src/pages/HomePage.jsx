import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

// Debounce function to limit API calls
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const searchFunds = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setResults([]);
    
    try {
      const res = await axios.get(`/api/funds/search?query=${encodeURIComponent(query.trim())}`);
      setResults(res.data);
      
      if (res.data.length === 0) {
        // Not setting this as an error, just informational
        setError('No funds found matching your search criteria.');
      }
    } catch (err) {
      console.error('Search error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === 'Network Error') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Failed to fetch funds. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Create a debounced version of the search function
  const debouncedSearch = useCallback(
    debounce(() => {
      if (query.trim().length >= 3) {
        searchFunds();
      }
    }, 500),
    [query]
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find the Best Mutual Funds</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search from thousands of mutual funds, view detailed information, and save your favorites for later.
        </p>
      </div>
      
      <form onSubmit={searchFunds} className="mb-8">
        <div className="flex shadow-lg rounded-lg overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              debouncedSearch();
            }}
            placeholder="Search mutual funds by name or keyword..."
            className="flex-grow px-6 py-4 text-lg focus:outline-none"
            minLength="3"
          />
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-8 py-4 hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
      
      {loading && <Spinner />}
      
      {error && (
        <div className={`px-4 py-3 rounded mb-6 ${error.includes('No funds found') 
          ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' 
          : 'bg-red-100 border border-red-400 text-red-700'}`}>
          {error}
        </div>
      )}
      
      {results.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold bg-gray-100 px-6 py-4">Search Results</h2>
          <ul className="divide-y divide-gray-200">
            {results.map((fund) => (
              <li 
                key={fund.schemeCode} 
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/fund/${fund.schemeCode}`)}
              >
                <div className="font-medium text-gray-900">{fund.schemeName}</div>
                <div className="text-gray-500 text-sm">{fund.schemeCode}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && query && !error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            No funds found. Try a different search term.
          </div>
        )
      )}
    </div>
  );
};

export default HomePage;