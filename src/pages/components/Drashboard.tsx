import React, { useState, useEffect, useRef } from 'react';

const Dashboard = ({ webcamStream, setWebcamStream }: any) => {
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
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
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
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black">
      <div
        className="bg-white rounded-lg p-4"
        style={{ width: '80%', maxWidth: '600px', height: '80%', maxHeight: '600px' }}
      >
        <h1 className="text-black mb-2 text-center font-bold">WebCam</h1>
        <div className="flex justify-center">
          <video
            ref={userVideoRef}
            autoPlay
            muted
            style={{ width: '100%', height: '100%', borderRadius: '6px', backgroundColor: 'black' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
