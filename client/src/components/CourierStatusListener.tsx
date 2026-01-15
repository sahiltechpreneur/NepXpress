'use client';

import { useEffect } from 'react';
import { getSocket } from '../socket';

const CourierStatusListener = () => {
  useEffect(() => {
    const socket = getSocket();

    socket.on('courier-status-updated', (data) => {
      console.log('📦 Courier status updated:', data);
    });

    return () => {
      socket.off('courier-status-updated');
    };
  }, []);

  return null;
};

export default CourierStatusListener;
