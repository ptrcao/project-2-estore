const router = require('express').Router();
const {  Customer } = require('../../models');
const bcrypt = require('bcrypt');
router.post('/', async (req, res) => {
    try {
     await Customer.create(req.body);
     req.session.loggedIn = true;
     req.session.user_id = UserData.dataValues.id;
   
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
// api/login

router.post('/login', async (req, res) => {
    try {
      const UserData = await Customer.findOne({
        where: {
          customer_email: req.body.customer_email,
        },
      });
  
      if (!UserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      const isValid = await bcrypt.compare(req.body.password, UserData.customer_password);
      if (!isValid) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
        req.session.loggedIn = true;
        req.session.user_id = UserData.dataValues.id;
      
      console.log(req.session);
      res
      .status(200)
      .redirect('back');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  
   
module.exports = router;