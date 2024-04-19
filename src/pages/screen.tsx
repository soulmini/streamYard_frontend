import React, { useEffect, useState } from "react";
// import VideoScreen from "./components/VideoScreen";
import Dashboard from "./components/Drashboard";
import useSocketIO from './useWebSocket';

function Screen() {
  const [direction, setDirection] = useState("vertical");
  const [panel1Size, setPanel1Size] = useState(50);
  const [panel2Size, setPanel2Size] = useState(50);
  const [startDisabled, setStartDisabled] = useState(false);
  const [closeDisabled, setCloseDisabled] = useState(true);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  
  const socket = useSocketIO('http://localhost:3000');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDirection("vertical");
        setPanel1Size(25);
        setPanel2Size(75);
      } else {
        setDirection("horizontal");
        setPanel1Size(50);
        setPanel2Size(50);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleStart = () => {
    setStartDisabled(true);
    setCloseDisabled(false);

    if (webcamStream) {
      const mediaRecorder = new MediaRecorder(webcamStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
      });

      mediaRecorder.ondataavailable = ev => {
        if (socket) {
          socket.emit('webcam', ev.data);
        }
      };

      mediaRecorder.start(25);
    }
  };

  const handleClose = () => {
    setStartDisabled(false);
    setCloseDisabled(true);
  };

  return (
    <div className="bg-black w-full h-full flex flex-col">
      <h2 className="ml-4 font-bold text-xl text-neutral-300 dark:text-neutral-200">
        StreamYard
      </h2>
      <div className="m-6">
        <Dashboard webcamStream={webcamStream} setWebcamStream={setWebcamStream} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-black py-4 px-6 flex justify-center">
        <button
          className={`bg-white text-black px-5 py-2 rounded mr-4 ${
            startDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleStart}
          disabled={startDisabled}
        >
          Start
        </button>
        <button
          className={`bg-white text-black px-5 py-2 rounded mr-4 ${
            closeDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleClose}
          disabled={closeDisabled}
        >
          Close
        </button>
  
      </div>
    </div>
  );
}

export default Screen;
