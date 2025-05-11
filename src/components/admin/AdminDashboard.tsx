import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Users as UsersThree, Search, Filter, Download } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for demonstration
  const stats = {
    total: 156,
    solo: 45,
    duo: 38,
    squad: 73
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Registrations */}
        <div className="gradient-border rounded-lg">
          <div className="p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Total Registrations</h3>
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-4xl font-bold text-white">{stats.total}</p>
          </div>
        </div>

        {/* Solo Registrations */}
        <div className="bg-gray-800 p-6 rounded-lg card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Solo Players</h3>
            <User className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-white">{stats.solo}</p>
        </div>

        {/* Duo Registrations */}
        <div className="bg-gray-800 p-6 rounded-lg card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Duo Teams</h3>
            <UserPlus className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-4xl font-bold text-white">{stats.duo}</p>
        </div>

        {/* Squad Registrations */}
        <div className="bg-gray-800 p-6 rounded-lg card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Squad Teams</h3>
            <UsersThree className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-4xl font-bold text-white">{stats.squad}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/admin/registrations" 
          className="bg-gray-800 p-6 rounded-lg card-hover flex items-center gap-4"
        >
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Search className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-lg">View All Registrations</h3>
            <p className="text-gray-400">Search and manage registrations</p>
          </div>
        </Link>

        <button className="bg-gray-800 p-6 rounded-lg card-hover flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Filter className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Filter Teams</h3>
            <p className="text-gray-400">Sort by type or status</p>
          </div>
        </button>

        <button className="bg-gray-800 p-6 rounded-lg card-hover flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Download className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Export Data</h3>
            <p className="text-gray-400">Download registration data</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;