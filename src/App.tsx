import React from 'react';
import TournamentRegistration from './components/TournamentRegistration';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Tournament Registration
          </h1>
          <p className="mt-2 text-gray-300">
            Register now to participate in our upcoming gaming tournament
          </p>
        </header>
        <TournamentRegistration />
      </div>
    </div>
  );
}

export default App;