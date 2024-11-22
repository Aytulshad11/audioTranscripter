import React from "react";

const TranscriptionDisplay = ({ transcription, error }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md min-h-[100px] mb-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>{transcription || "Transcription will appear here..."}</p>
      )}
    </div>
  );
};

export default TranscriptionDisplay;
