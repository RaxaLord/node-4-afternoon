require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');

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

app.get('/api/swag', swagController.read);

app.listen(
  SERVER_PORT,
  console.log(`Server listening on port: ${SERVER_PORT}`),
);
