import React from 'react';
import { TournamentType } from '../TournamentRegistration';
import { Users, User, UserPlus } from 'lucide-react';

interface TournamentTypeSelectorProps {
  onSelect: (type: TournamentType) => void;
  selectedType: TournamentType;
}

const TournamentTypeSelector: React.FC<TournamentTypeSelectorProps> = ({ onSelect, selectedType }) => {
  const tournamentTypes = [
    { 
      id: 'solo', 
      title: 'Solo', 
      description: 'Enter the tournament as an individual player',
      icon: <User className="w-12 h-12 mb-4" />,
      players: '1 Player'
    },
    { 
      id: 'duo', 
      title: 'Duo', 
      description: 'Team up with a friend and compete as a pair',
      icon: <UserPlus className="w-12 h-12 mb-4" />,
      players: '2 Players'
    },
    { 
      id: 'squad', 
      title: 'Squad', 
      description: 'Form a full team and battle for supremacy',
      icon: <Users className="w-12 h-12 mb-4" />,
      players: '4 Players'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Select Tournament Type</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tournamentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id as TournamentType)}
            className={`
              flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300
              border-2 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20
              ${selectedType === type.id 
                ? 'bg-gradient-to-br from-blue-900 to-purple-900 border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'bg-gray-700 border-gray-600'}
            `}
          >
            <div className="text-blue-400">
              {type.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{type.title}</h3>
            <p className="text-gray-300 text-sm text-center mb-4">{type.description}</p>
            <span className="px-4 py-1 bg-blue-800 rounded-full text-xs font-semibold">
              {type.players}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TournamentTypeSelector;