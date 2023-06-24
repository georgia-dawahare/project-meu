import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

// import emotionsRouter from './routers/emotionsRouter';
// import pairsRouter from './routers/pairsRouter';
// import eventsRouter from './routers/eventsRouter';
// import responsesRouter from './routers/responsesRouter';
import userRoutes from './routers/UserRouter';
import eventRoutes from './routers/EventRouter';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
// app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
// app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
// app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// additional init stuff should go before hitting the routing
// app.use('/emotions', emotionsRouter);
// app.use('/pairs', pairsRouter);
// app.use('/responses', responsesRouter);

app.use('/users', userRoutes);
app.use('/events', eventRoutes);

// default index route
app.get('/', (req, res) => {
  res.send('Welcome to MeU backend!');
});

// START THE SERVER
// =============================================================================
async function startServer() {
  try {
    // connect DB
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://meu:veboMSYezohtz3KH@meu.qhrlh5k.mongodb.net/?retryWrites=true&w=majority';
    // const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/meu';

    await mongoose.connect(mongoURI);
    console.log(`Mongoose connected to: ${mongoURI}`);

    const port = process.env.PORT || 9090;
    app.listen(port);

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}

startServer();
