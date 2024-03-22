const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register Controller

exports.register = async (req, res) => {
    const { username,email, password } = req.body;
    const saltRounds = 10;
    try {

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
        // Save the username and hash to a database or file
            const user = new User({ username, email, password:hash });
            await user.save();
            res.sendStatus(200);
        }
    });
    
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Login Controller

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.isValidPassword(password, user.password))) {
          return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user });
      } catch (error) {
        res.status(500).send({error:error.message});
      }
};
