import React, { useState } from 'react';
import api from '../config/api';

function TestAPI() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testing connection...\n');
    
    try {
      // Log the base URL being used
      console.log('API Base URL:', api.defaults.baseURL);
      console.log('Environment:', import.meta.env.MODE);
      console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
      
      setResult(prev => prev + `\nAPI Base URL: ${api.defaults.baseURL || 'Empty (using proxy)'}`);
      setResult(prev => prev + `\nEnvironment: ${import.meta.env.MODE}`);
      setResult(prev => prev + `\nVITE_API_URL: ${import.meta.env.VITE_API_URL || 'Not set'}`);
      
      // Try to make a test request
      const response = await api.post('/api/v1/user/signup', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'test123'
      });
      
      setResult(prev => prev + `\n\n✅ Success! Response: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      console.error('Test error:', error);
      setResult(prev => prev + `\n\n❌ Error occurred:`);
      setResult(prev => prev + `\nMessage: ${error.message}`);
      setResult(prev => prev + `\nStatus: ${error.response?.status || 'No response'}`);
      setResult(prev => prev + `\nStatus Text: ${error.response?.statusText || 'N/A'}`);
      setResult(prev => prev + `\nBackend Message: ${error.response?.data?.message || 'No message'}`);
      setResult(prev => prev + `\n\nFull Error: ${JSON.stringify(error.response?.data || error.message, null, 2)}`);
      
      // Check for CORS error
      if (!error.response) {
        setResult(prev => prev + `\n\n⚠️ No response received. This might be a CORS or network error.`);
        setResult(prev => prev + `\nCheck if backend is running at: ${api.defaults.baseURL || 'proxy target'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">API Connection Test</h1>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mb-4 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Signup API'}
        </button>

        {result && (
          <pre className="bg-gray-800 p-4 rounded-lg whitespace-pre-wrap overflow-x-auto">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}

export default TestAPI;
