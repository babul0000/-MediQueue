import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            {/* পালসিং অ্যানিমেশন সহ একটি সুন্দর সার্কেল */}
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#534AB7] animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-[#CECBF6] animate-spin animation-delay-[-0.3s]"></div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-400 tracking-widest uppercase">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;