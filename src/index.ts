'use strict';
import { Request, Response } from 'express';
import express from 'express';

// Service
function generateServerResponse(responseLimit: string) {
  return `The current endpoint request limitation is ${responseLimit}`;
}

// Controller
function noLimit(req: Request, res: Response) {
  res.end(generateServerResponse('none'));
}

function limit10(req: Request, res: Response) {
  res.end(generateServerResponse('10'));
}

function limit100(req: Request, res: Response) {
  res.end(generateServerResponse('100'));
}

// Router
const smileStationRouter = express.Router();
smileStationRouter.get('/', noLimit);
smileStationRouter.get('/1l', limit10);
smileStationRouter.get('/1h', limit100);

// Server
export const createServer = () => {
  const app = express();

  app.use('/smile-station', smileStationRouter);

  return app;
};

// Start server
const port = 3001;
const server = createServer();
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
