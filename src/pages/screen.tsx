import VideoScreen from "./components/VideoScreen";
import Dashboard from "./components/Drashboard";
import useSocketIO from './useWebSocket'; // Updated import
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Screen() {
  const [direction, setDirection] = useState("vertical");
  const [panel1Size, setPanel1Size] = useState(50);
  const [panel2Size, setPanel2Size] = useState(50);
  const [startDisabled, setStartDisabled] = useState(false);
  const [closeDisabled, setCloseDisabled] = useState(true);
  const [shareDisabled, setShareDisabled] = useState(true);
  const [closeShareDisabled, setCloseShareDisabled] = useState(true);
  const [sharing, setSharing] = useState(false);

  const socket = useSocketIO('http://localhost:3000'); // Updated socket initialization

  // media
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Adjust direction and default sizes based on screen width
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

    // Call handleResize initially and add resize event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove resize event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleStart = () => {
    setStartDisabled(true);
    setCloseDisabled(false);
    setShareDisabled(false);

    // binary data of web cam
    if (webcamStream) {
      const mediaRecorder = new MediaRecorder(webcamStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
      });

      mediaRecorder.ondataavailable = ev => {
        // Send webcam data through Socket.IO when available
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
    setShareDisabled(true);
    setCloseShareDisabled(true);
  };

  const handleShare = () => {
    setShareDisabled(true);
    setCloseShareDisabled(false);

    // Binary data of ScreenStream
    if (screenStream) {
      const screenMediaRecorder = new MediaRecorder(screenStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
      });

      screenMediaRecorder.ondataavailable = ev => {
        // Send screen data through Socket.IO when available
        if (socket) {
          socket.emit('screen', ev.data);
        }
      };

      screenMediaRecorder.start(25);
    }
  };

  const handleCloseShare = () => {
    setShareDisabled(false);
    setCloseShareDisabled(true);
  };

  return (
    
    <div className="bg-black w-full h-full flex flex-col">
      <h2 className="ml-4 font-bold text-xl text-neutral-300 dark:text-neutral-200">
        StreamYard
      </h2>
          <div className="m-6">
            <Dashboard webcamStream={webcamStream} setWebcamStream={setWebcamStream} />
          </div>
          <div className="mb-6 bg-black">
            <VideoScreen screenStream={screenStream} setScreenStream={setScreenStream} />
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
        <button
          className={`bg-white text-black px-5 py-2 rounded mr-4 ${
            shareDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleShare}
          disabled={shareDisabled}
        >
          Share Screen
        </button>
        <button
          className={`bg-white text-black px-5 py-2 rounded ${
            closeShareDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleCloseShare}
          disabled={closeShareDisabled}
        >
          Stop Share
        </button>
      </div>
    </div>
  );
}

export default Screen;
