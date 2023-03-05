const express = require('express');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const session = require('express-session');
const routes = require('./controllers')
// Import the connection object
const sequelize = require('./config/connection');
app.use(
  session({
    secret: process.env.COOKIE_SECRET || "secret",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30, // 30 minutes
      sameSite: "strict",
      secure: true,
    },
  })
);

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/public_html/cart.html');
});

app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/public_html/checkout.html');
});


// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});


