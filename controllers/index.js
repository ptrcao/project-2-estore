const router = require('express').Router();
const apiRoutes = require('./api');

<<<<<<< HEAD
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
=======

router.use('/api', apiRoutes);


module.exports = router;
>>>>>>> 94d00078959aeb56412fba15702e503ede884e3c
