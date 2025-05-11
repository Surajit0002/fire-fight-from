import React, { useState } from 'react';
import TournamentTypeSelector from './steps/TournamentTypeSelector';
import PlayerOrTeamForm from './steps/PlayerOrTeamForm';
import PaymentConfirmation from './steps/PaymentConfirmation';
import StepIndicator from './ui/StepIndicator';
import { useTournamentStore } from '../store/tournamentStore';

export type TournamentType = 'solo' | 'duo' | 'squad' | '';
export type PlayerInfo = {
  name: string;
  uid: string;
};

export type FormData = {
  tournamentType: TournamentType;
  teamName: string;
  teamLogo: File | null;
  players: PlayerInfo[];
  paymentScreenshot: File | null;
};

const TournamentRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    tournamentType: '',
    teamName: '',
    teamLogo: null,
    players: [],
    paymentScreenshot: null,
  });
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const createRegistration = useTournamentStore(state => state.createRegistration);
  const loading = useTournamentStore(state => state.loading);
  const error = useTournamentStore(state => state.error);

  const handleTournamentTypeSelect = (type: TournamentType) => {
    const playersCount = type === 'solo' ? 1 : type === 'duo' ? 2 : 4;
    
    setFormData({
      ...formData,
      tournamentType: type,
      players: Array(playersCount).fill({}).map(() => ({ name: '', uid: '' })),
    });
    
    goToNextStep();
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async () => {
    try {
      await createRegistration(formData);
      setRegistrationComplete(true);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setFormData({
      tournamentType: '',
      teamName: '',
      teamLogo: null,
      players: [],
      paymentScreenshot: null,
    });
    setCurrentStep(1);
    setRegistrationComplete(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
        <p>Error: {error}</p>
        <button 
          onClick={resetForm}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {!registrationComplete ? (
        <>
          <StepIndicator currentStep={currentStep} totalSteps={3} />
          
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300">
            <div className="p-6">
              {currentStep === 1 && (
                <TournamentTypeSelector 
                  onSelect={handleTournamentTypeSelect} 
                  selectedType={formData.tournamentType}
                />
              )}
              
              {currentStep === 2 && (
                <PlayerOrTeamForm
                  tournamentType={formData.tournamentType}
                  players={formData.players}
                  teamName={formData.teamName}
                  updateFormData={updateFormData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}
              
              {currentStep === 3 && (
                <PaymentConfirmation
                  formData={formData}
                  updateFormData={updateFormData}
                  onSubmit={handleSubmit}
                  onBack={goToPreviousStep}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 text-center animate-fade-in">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-green-400 mb-4">Registration Successful!</h2>
          <p className="mb-6 text-gray-300">
            Thank you for registering for the tournament. We have received your information and payment confirmation.
            You will receive further details via email.
          </p>
          
          <button 
            onClick={resetForm}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
          >
            Register Another Team
          </button>
        </div>
      )}
    </div>
  );
};

export default TournamentRegistration;