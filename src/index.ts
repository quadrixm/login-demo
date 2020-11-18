import {LoginDemoApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {LoginDemoApplication};

export async function main(options: ApplicationConfig = {}) {
  if (options.rest) {
    options.rest.port = 3001;
    options.rest.host = "0.0.0.0";
  } else {
    options.rest = {port: 3001, host: "0.0.0.0"}
  }
  const app = new LoginDemoApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
