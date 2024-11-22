import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import MicrophoneControl from "../components/MicrophoneControl";
import TranscriptionDisplay from "../components/TranscriptionDisplay";
import PastTranscriptions from "../components/PastTranscriptions";
import SaveButton from "../components/SaveButton";

const DEEPGRAM_API_KEY = import.meta.env.VITE_APP_VOICE

const AudioTranscription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [pastTranscriptions, setPastTranscriptions] = useState([]);
  const [error, setError] = useState(null);

  const mediaRecorder = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    return () => {
      if (socket.current) socket.current.close();
    };
  }, []);

  //TO START RECORDING
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      socket.current = new WebSocket("wss://api.deepgram.com/v1/listen", [
        "token",
        DEEPGRAM_API_KEY,
      ]);

      socket.current.onopen = () => {
        console.log("WebSocket connection established");
        mediaRecorder.current.start(250);
      };

      socket.current.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        if (transcript) setTranscription((prev) => prev + " " + transcript);
      };

      socket.current.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError("An error occurred with the transcription service.");
      };

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0 && socket.current?.readyState === WebSocket.OPEN) {
          socket.current.send(event.data);
        }
      };

      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error("Error accessing the microphone:", err);
      setError("Error accessing the microphone. Please ensure you have given permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) mediaRecorder.current.stop();
    if (socket.current) socket.current.close();
    setIsRecording(false);
  };

  const saveTranscription = () => {
    if (transcription.trim()) {
      setPastTranscriptions((prev) => [...prev, transcription.trim()]);
      setTranscription("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-md shadow-md">
        <Header title="Audio Transcription" />
        <div className="p-4">
          <MicrophoneControl
            isRecording={isRecording}
            onStart={startRecording}
            onStop={stopRecording}
          />
          <TranscriptionDisplay transcription={transcription} error={error} />
          <SaveButton onSave={saveTranscription} isDisabled={!transcription.trim()} />
        </div>
      </div>
      {pastTranscriptions.length > 0 && (
        <div className="border rounded-md shadow-md mt-4 p-4">
          <PastTranscriptions transcriptions={pastTranscriptions} />
        </div>
      )}
    </div>
  );
};

export default AudioTranscription;
