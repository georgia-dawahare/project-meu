import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import responseGroupRoutes from './routers/ResponseGroupRouter';
import responseRoutes from './routers/ResponseRouter';
import eventRoutes from './routers/EventRouter';
import userRoutes from './routers/UserRouter';
import pairRoutes from './routers/PairRouter';

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
app.use('/responses', responseRoutes);
app.use('/response_groups', responseGroupRoutes);
app.use('/events', eventRoutes);
app.use('/pairs', pairRoutes);
app.use('/users', userRoutes);

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
