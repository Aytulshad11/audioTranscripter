import React from "react";

const SaveButton = ({ onSave, isDisabled }) => {
  return (
    <button
      onClick={onSave}
      disabled={isDisabled}
      className={`px-6 py-2 rounded-md text-white ${
        isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
      }`}
    >
      Save Transcription
    </button>
  );
};

export default SaveButton;
