import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AudioTranscription from "../pages/AudioTranscription";

describe("AudioTranscription Component", () => {
  test("starts and stops recording", async () => {
    global.navigator.mediaDevices = {
      getUserMedia: jest.fn().mockResolvedValue(new MediaStream()),
    };

    const mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: WebSocket.OPEN,
    };

    global.WebSocket = jest.fn(() => mockWebSocket);

    render(<AudioTranscription />);
    const button = screen.getByText("Start Recording");

    // Start Recording
    fireEvent.click(button);
    expect(await screen.findByText("Stop Recording")).toBeInTheDocument();

    // Stop Recording
    fireEvent.click(screen.getByText("Stop Recording"));
    expect(await screen.findByText("Start Recording")).toBeInTheDocument();
  });
});
