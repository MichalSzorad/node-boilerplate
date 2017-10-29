import createSocket from 'socket.io';


export default (app) => {
  const io = createSocket(3030);

  io.on('connection', (socket) => {
    console.log('new connection');
    
    socket.emit('message', {
      text: 'welcome'
    });

    socket.on('message', m => console.log('received message', m));
  });

  return io;
};