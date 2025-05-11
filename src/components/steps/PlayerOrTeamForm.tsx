import React, { useState } from 'react';
import { TournamentType, PlayerInfo } from '../TournamentRegistration';
import Button from '../ui/Button';
import { Users, UserPlus, Trophy, X, Upload, Image } from 'lucide-react';

interface PlayerOrTeamFormProps {
  tournamentType: TournamentType;
  players: PlayerInfo[];
  teamName: string;
  updateFormData: (data: { teamName?: string; players?: PlayerInfo[]; teamLogo?: File | null }) => void;
  onNext: () => void;
  onBack: () => void;
}

const PlayerOrTeamForm: React.FC<PlayerOrTeamFormProps> = ({
  tournamentType,
  players,
  teamName,
  updateFormData,
  onNext,
  onBack,
}) => {
  const [activePlayer, setActivePlayer] = useState<number>(0);
  const [teamLogo, setTeamLogo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePlayerChange = (index: number, field: keyof PlayerInfo, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    updateFormData({ players: updatedPlayers });
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ teamName: e.target.value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setTeamLogo(reader.result as string);
        updateFormData({ teamLogo: file });
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const addPlayer = () => {
    if (players.length < (tournamentType === 'squad' ? 6 : 3)) {
      updateFormData({ 
        players: [...players, { name: '', uid: '' }]
      });
    }
  };

  const removePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    updateFormData({ players: updatedPlayers });
  };

  const isFormValid = () => {
    const allPlayersFilled = players.every(player => 
      player.name.trim() !== '' && player.uid.trim() !== ''
    );
    
    if (tournamentType === 'squad') {
      return allPlayersFilled && teamName.trim() !== '' && players.length >= 4;
    }
    
    if (tournamentType === 'duo') {
      return allPlayersFilled && players.length >= 2;
    }
    
    return allPlayersFilled;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {tournamentType === 'solo' ? 'Player Information' : 'Team Information'}
      </h2>

      <form className="space-y-8">
        {tournamentType !== 'solo' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Team Logo Upload */}
            <div className="relative">
              <input
                type="file"
                id="teamLogo"
                onChange={handleLogoUpload}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="teamLogo"
                className={`
                  block aspect-square rounded-lg overflow-hidden cursor-pointer
                  bg-gradient-to-br from-blue-900/50 to-purple-900/50
                  border-2 border-dashed border-blue-500/50
                  transition-all duration-300 hover:border-blue-400
                  ${isUploading ? 'animate-pulse' : ''}
                `}
              >
                {teamLogo ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={teamLogo}
                      alt="Team Logo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Image className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <Upload className="w-10 h-10 text-blue-400 mb-2" />
                    <p className="text-blue-400 text-sm font-medium text-center">
                      Upload Team Logo
                    </p>
                    <p className="text-gray-400 text-xs mt-1 text-center">
                      PNG, JPG (max 2MB)
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Team Name Input - Now spans 2 columns */}
            <div className="md:col-span-2 relative">
              <div className="absolute -top-3 left-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-lg border border-purple-500/30 h-full flex flex-col justify-center">
                <label className="block text-purple-300 text-sm font-medium mb-2">Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={handleTeamNameChange}
                  className="w-full p-3 bg-purple-900/50 border border-purple-500/30 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 text-white
                           placeholder-purple-400"
                  placeholder="Enter your team name"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {tournamentType !== 'solo' && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Team Roster
              </h3>
              <Button
                onClick={addPlayer}
                variant="secondary"
                disabled={players.length >= (tournamentType === 'squad' ? 6 : 3)}
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Player
                </div>
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {players.map((player, index) => (
              <div
                key={index}
                className={`
                  relative p-6 rounded-lg transition-all duration-300 cursor-pointer
                  ${index === activePlayer
                    ? 'bg-gradient-to-r from-blue-900 to-purple-900 border-2 border-blue-400'
                    : 'bg-gray-800 hover:bg-gray-750 border border-gray-700'}
                `}
                onClick={() => setActivePlayer(index)}
              >
                <div className="absolute -top-3 left-4 px-2 py-1 bg-blue-500 rounded-full text-xs font-bold">
                  Player {index + 1}
                </div>
                
                {tournamentType !== 'solo' && players.length > (tournamentType === 'duo' ? 2 : 4) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePlayer(index);
                    }}
                    className="absolute -top-3 right-4 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md
                               focus:outline-none focus:ring-2 focus:ring-blue-500 text-white
                               transition-all duration-300"
                      placeholder="Enter player name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Game UID</label>
                    <input
                      type="text"
                      value={player.uid}
                      onChange={(e) => handlePlayerChange(index, 'uid', e.target.value)}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md
                               focus:outline-none focus:ring-2 focus:ring-blue-500 text-white
                               transition-all duration-300"
                      placeholder="Enter game ID"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
          <Button onClick={onBack} variant="secondary">
            Back
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!isFormValid()}
            variant="primary"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlayerOrTeamForm;