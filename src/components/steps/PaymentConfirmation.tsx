import React, { useState } from 'react';
import { FormData } from '../TournamentRegistration';
import Button from '../ui/Button';
import { Upload, Check } from 'lucide-react';

interface PaymentConfirmationProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  formData,
  updateFormData,
  onSubmit,
  onBack,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        updateFormData({ paymentScreenshot: e.target.files![0] });
        setIsUploading(false);
      }, 1000);
    }
  };

  const getTournamentFee = () => {
    switch (formData.tournamentType) {
      case 'solo': return '$10.00';
      case 'duo': return '$18.00';
      case 'squad': return '$35.00';
      default: return '$0.00';
    }
  };

  const isFormValid = () => {
    return formData.paymentScreenshot !== null;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Confirmation</h2>
      
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <h3 className="font-medium text-lg mb-4">Registration Summary</h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-300">Tournament Type:</span>
            <span className="font-medium capitalize">{formData.tournamentType}</span>
          </div>
          
          {formData.tournamentType === 'squad' && (
            <div className="flex justify-between">
              <span className="text-gray-300">Team Name:</span>
              <span className="font-medium">{formData.teamName}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-300">Players:</span>
            <span className="font-medium">{formData.players.length}</span>
          </div>
          
          <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-600">
            <span>Total Fee:</span>
            <span className="text-blue-400">{getTournamentFee()}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-lg mb-4">Payment Instructions</h3>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            Please scan the QR code below or use the UPI ID to complete your payment:
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-white p-4 rounded-lg">
              {/* This would be a real QR code in a production app */}
              <div className="w-48 h-48 bg-gray-900 grid grid-cols-5 grid-rows-5 gap-1 p-2">
                {Array(25).fill(0).map((_, i) => (
                  <div key={i} className={`
                    ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}
                    ${(i < 5 || i >= 20 || i % 5 === 0 || i % 5 === 4) ? 'bg-black' : ''}
                  `}></div>
                ))}
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-gray-300 mb-2">UPI ID:</p>
              <p className="font-mono bg-gray-600 px-4 py-2 rounded-md mb-2">tournament@gameupi</p>
              <p className="text-sm text-gray-400">
                Please include your name or team name in the payment description
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-gray-300 mb-4">
            After payment, please upload a screenshot of your payment confirmation:
          </p>
          
          <div className="relative">
            <input
              type="file"
              id="paymentScreenshot"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*"
            />
            
            {formData.paymentScreenshot ? (
              <div className="border-2 border-green-500 border-dashed rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-green-400 font-medium">
                    {formData.paymentScreenshot.name}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Click here to change file
                  </p>
                </div>
              </div>
            ) : (
              <label
                htmlFor="paymentScreenshot"
                className={`
                  border-2 border-blue-500 border-dashed rounded-lg p-6 flex items-center justify-center cursor-pointer
                  hover:bg-blue-500/10 transition-colors duration-200
                  ${isUploading ? 'animate-pulse' : ''}
                `}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 mb-4">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-blue-400 font-medium">
                    {isUploading ? 'Uploading...' : 'Click to upload payment screenshot'}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    PNG, JPG or JPEG (max. 5MB)
                  </p>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button onClick={onBack} variant="secondary">
          Back
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={!isFormValid()}
          variant="success"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;