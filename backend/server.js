import "dotenv/config";
import http from 'http';
import app from './app.js';

// normalizePort ensures we get a valid port number from environment or default '3000'
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Get the port and store it in Express settings
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// errorHandler manages server errors like port in use or insufficient privileges
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Create the HTTP server and pass all requests to Express
const server = http.createServer(app);

// Attach the error handler to respond if the server encounters an error
server.on('error', errorHandler);

// Log a message once the server is successfully listening
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


// Start the server and begin listening for incoming requests
server.listen(port);