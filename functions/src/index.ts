import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';

let app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
import {userRoutes} from './routes/user.routes';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request:express.Request, response:express.Response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});


export const api = functions.https.onRequest(app);




//Load api Routes
app.use('/v1/users',userRoutes)

