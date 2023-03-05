const router = require('express').Router();

router.get('api/checkout', (req, res) => {
    res.sendFile(__dirname + '/public_html/checkout.html');
  });

module.exports = router;