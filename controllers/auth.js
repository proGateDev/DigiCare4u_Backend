// controllers/authController.js

const User = require('../user/models/user');
const { check, validationResult } = require('express-validator');

module.exports = {
  //===============  GET ====================================
  authUser: async (req, res) => {
    console.log('------ started ------')
    // Validate request
    await check('name', 'Please include a valid email').isString().run(req);
    await check('password', 'Password is required').notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ name });
      console.log(user);
      if (!user) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }



      // Authentication successful
      res.status(200).json({ msg: 'Logged in successfully', userId:user.id });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
};
