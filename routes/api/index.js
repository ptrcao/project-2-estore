app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public_html/index.html');
  });

  const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
