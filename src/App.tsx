import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TournamentRegistration from './components/TournamentRegistration';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminRegistrations from './components/admin/AdminRegistrations';
import { Shield } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <Link to="/" className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Tournament Registration
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Admin</span>
            </Link>
          </header>
          
          <Routes>
            <Route path="/" element={<TournamentRegistration />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/registrations" element={<AdminRegistrations />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;