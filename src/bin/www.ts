import { createServer } from 'http';
import { networkInterfaces } from 'os';
import chalk from 'chalk';
import { app } from '../app';
import config from 'config';

const { port } = config;
const server = createServer(app.callback());
server.listen(port);

const iFaces = networkInterfaces();
console.info(chalk.cyan('Starting up server\nAvailable on:'));

Object.values(iFaces).forEach(iFace => {
  iFace.forEach(details => {
    if (details.family === 'IPv4') {
      console.info(`  http://${details.address}:${chalk.green(port.toString())}`);
    }
  });
});

server.on('error', (error:NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
