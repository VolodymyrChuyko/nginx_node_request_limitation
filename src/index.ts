'use strict';
import { Request, Response } from 'express';
import express from 'express';

// Create server
const server = express();
server.get('/smile-station', (req: Request, res: Response) => {res.end('Hello from node server!!!')});

// Start server
const port = 3001;
server.listen(port, () =>
{
    console.log(`node server started on port ${port}`);
});
