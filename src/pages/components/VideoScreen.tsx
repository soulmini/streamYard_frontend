import React, { useEffect, useRef } from 'react';
const VideoScreen = ({screenStream, setScreenStream} : any) => {
  const displayVideoRef = useRef<HTMLVideoElement>(null);
  const startScreenSharing = async () => {
    try {
      const screenStreamVideo = await navigator.mediaDevices.getDisplayMedia({ video: true });
      displayVideoRef.current!.srcObject = screenStreamVideo;
      setScreenStream(screenStreamVideo);
    } catch (error) {
      console.error('Error accessing screen:', error);
    }
  };

  return (
    <div className="fixed top-7 left-0 w-full bg-black flex flex-col items-center justify-center p-4">
      <div className="bg-black rounded-xl border border-white w-80vw sm:w-3/4 lg:w-3/4 xl:w-2/4 flex flex-col justify-center items-center p-4">
        <h1 className="text-white mb-4">Screen</h1>
        <div className="text-white w-full h-80 relative">
          <video ref={displayVideoRef} muted autoPlay className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <button
          className="bg-white text-black border border-white rounded px-5 py-2 mt-4"
          onClick={startScreenSharing}
        >
          Start Screen Sharing
        </button>
      </div>
    </div>
  );
};

export default VideoScreen;
