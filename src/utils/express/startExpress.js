import express from 'express';
import http from 'http';


/**
 * Start web service using express
 *
 * @param {Object} options
 * @param {(Number|String)=} options.port
 * @param {Function=} options.middleware
 * @param {Object=} options.app
 * @returns {Promise}
 */
export default (options) => new Promise((resolve, reject) => {

  const DEFAULT_MIDDLEWARE = (app) => app.get('/', (req, res) => res.send('It\'s working!'));
  const { port = 80, middleware = DEFAULT_MIDDLEWARE, app = express() } = options;

  /**
   * Normalize a port into a number, string, or false.
   */
  const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  };

  // apply middleware
  middleware(app);

  app.set('port', normalizePort(port));
  const server = http.createServer(app);


  server.listen(port);
  server.on('error', (err) => reject(err));
  server.on('listening', () => resolve(app));
});