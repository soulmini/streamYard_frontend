import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocketIO = (url: string): Socket | null => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const initializeSocketIO = () => {
      const socket = io(url);

      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
      });

      socket.on('error', (error) => {
        console.error('Socket.IO error:', error);
      });
    };

    initializeSocketIO();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);

  return socketRef.current;
};

export default useSocketIO;
