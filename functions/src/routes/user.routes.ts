
import {Request,Response,NextFunction,Router } from 'express';
export const userRoutes = Router();


// middleware that is specific to this router
userRoutes.use(function timeLog(req:Request, res:Response, next:NextFunction ) {
  console.log('Time: ', Date());
  next();
});
// define the home page route
userRoutes.get('/', function(req:Request, res:Response) {
  res.send('Birds home page');
});
// define the about route
userRoutes.get('/about', function(req:Request, res:Response) {
  res.send('About birds');
});


