import React from "react";

const PastTranscriptions = ({ transcriptions }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Past Transcriptions</h2>
      <ul className="list-disc pl-5">
        {transcriptions.map((text, index) => (
          <li key={index} className="mb-2">{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default PastTranscriptions;
