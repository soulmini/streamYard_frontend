// Client side - React component
import React, { useState, useEffect, useRef } from 'react';

const Dashboard = ({webcamStream, setWebcamStream} : any ) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setMediaStream(stream);
        setWebcamStream(stream);
        userVideoRef.current!.srcObject = stream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };
    getUserMedia();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="bg-black rounded-xl mx-auto w-40 h-40 fixed bottom-20 left-4 flex flex-col justify-center items-center border border-gray-300">
      <h1 className="text-white mb-1">WebCam</h1>
      <div className="text-white bg-black flex flex-col justify-center items-center">
        <video
          ref={userVideoRef}
          autoPlay
          muted
          style={{ width: '100%', height: '100%', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
