import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TournamentRegistration from './components/TournamentRegistration';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminRegistrations from './components/admin/AdminRegistrations';
import AuthForm from './components/auth/AuthForm';
import { Shield, LogOut } from 'lucide-react';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, checkUser, signOut } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <Link to="/" className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Tournament Registration
            </Link>
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span>Admin</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5 text-red-400" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </header>
          
          <Routes>
            <Route path="/" element={user ? <TournamentRegistration /> : <AuthForm />} />
            <Route path="/admin" element={user ? <AdminDashboard /> : <AuthForm />} />
            <Route path="/admin/registrations" element={user ? <AdminRegistrations /> : <AuthForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;