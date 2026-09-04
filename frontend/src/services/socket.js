import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});

export const joinComplaintRoom = (complaintID) => {
  socket.emit('join-complaint', complaintID);
};

export const subscribeToUpdates = (callback) => {
  socket.on('complaint-updated', callback);
};

export const unsubscribeFromUpdates = () => {
  socket.off('complaint-updated');
};
