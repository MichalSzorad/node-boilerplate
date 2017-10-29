import debug from 'debug';
import setupExpress from './setup/express';
import setupSocket from './setup/socketio';
import startExpress from './utils/express/startExpress';

const log = debug('app:');

startExpress({ middleware: setupExpress, port: 3000 }).then(app => {
  // setup websocket
  setupSocket();

  const port = app.get('port');
  log(`App is running on port ${port}`);
  log(`Go to http://localhost:${port}/`);
}).catch(error => {
  log('Error - could not setup app', error);
});