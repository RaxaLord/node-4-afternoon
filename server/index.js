require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const {
  login,
  register,
  signout,
  getUser,
} = require('./controllers/authController');

const cartController = require('./controllers/cartController');
const { search } = require('./controllers/searchController');

const app = express();

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagController.read);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.get('/api/user', getUser);
app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);
app.get('/api/search', search);

app.listen(
  SERVER_PORT,
  console.log(`Server listening on port: ${SERVER_PORT}`),
);
