const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const UserData = await User.create({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: req.body.password,

      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(UserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
// api/login

router.post('/login', async (req, res) => {
    try {
      const UserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!UserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const Password = await UserData.checkPassword(req.body.password);
  
      if (!Password) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
    
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: UserData, message: 'You have logged in!' });
      });
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