module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('👤 User connected:', socket.id);

    socket.on('join-complaint', (complaintID) => {
      socket.join(`complaint-${complaintID}`);
    });

    socket.on('status-update', (data) => {
      io.to(`complaint-${data.complaintID}`).emit('complaint-updated', {
        status: data.status,
        message: data.message,
        timestamp: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log('👤 User disconnected:', socket.id);
    });
  });
};
