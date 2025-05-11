import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-full 
                border-2 transition-colors duration-300
                ${index + 1 <= currentStep 
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400' 
                  : 'border-gray-600 bg-gray-700 text-gray-400'}
              `}>
                <span className="font-bold">{index + 1}</span>
                {index + 1 < currentStep && (
                  <svg className="absolute w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" />
                  </svg>
                )}
              </div>
              
              {/* Step name */}
              <span className={`
                mt-2 text-sm font-medium transition-colors duration-300
                ${index + 1 <= currentStep ? 'text-blue-400' : 'text-gray-500'}
              `}>
                {index === 0 ? 'Tournament Type' : index === 1 ? 'Player Info' : 'Payment'}
              </span>
            </div>
            
            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-2">
                <div className={`
                  h-1 rounded-full transition-colors duration-300
                  ${index + 1 < currentStep ? 'bg-blue-500' : 'bg-gray-600'}
                `}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;