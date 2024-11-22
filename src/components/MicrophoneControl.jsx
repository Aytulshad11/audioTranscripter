import React from "react";

const MicrophoneControl = ({ isRecording, onStart, onStop }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={isRecording ? onStop : onStart}
        className={`px-6 py-2 rounded-md text-white ${
          isRecording ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default MicrophoneControl;
