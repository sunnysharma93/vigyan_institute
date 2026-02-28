import React from 'react';
import { ClipLoader, PulseLoader, BeatLoader, FadeLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  type?: 'clip' | 'pulse' | 'beat' | 'fade';
  size?: number;
  color?: string;
  message?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = 'clip',
  size = 50,
  color = '#3B82F6',
  message,
  fullScreen = false,
  overlay = false
}) => {
  const getSpinner = () => {
    const commonProps = {
      loading: true,
      color: color
    };

    switch (type) {
      case 'pulse':
        return <PulseLoader {...commonProps} size={size} />;
      case 'beat':
        return <BeatLoader {...commonProps} size={size} />;
      case 'fade':
        return <FadeLoader {...commonProps} height={size} width={size} />;
      case 'clip':
      default:
        return <ClipLoader {...commonProps} size={size} />;
    }
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center">
      {getSpinner()}
      {message && (
        <p className="mt-4 text-gray-600 text-sm sm:text-base animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;
