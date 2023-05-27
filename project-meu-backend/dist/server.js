"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _morgan = _interopRequireDefault(require("morgan"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// initialize
const app = (0, _express.default)();

// enable/disable cross origin resource sharing if necessary
app.use((0, _cors.default)());

// enable/disable http request logging
app.use((0, _morgan.default)('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(_express.default.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', _path.default.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json()); // To parse the incoming requests with JSON payloads

// additional init stuff should go before hitting the routing

// default index route
app.get('/', (req, res) => {
  res.send('hi');
});

// START THE SERVER
// =============================================================================
async function startServer() {
  try {
    const port = process.env.PORT || 9090;
    app.listen(port);
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}
startServer();