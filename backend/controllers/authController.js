const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller to handle user registration
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Get user data from request body

  try {
    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // If user exists, send a 400 Bad Request with an error message
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); // Save the user to the database

    // Create a JWT token for the newly registered user to use for authentication
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Respond with the created user and the auth token
    res.status(201).json({ user: newUser, token });

  } catch (err) {
    // Log any errors that happen for debugging
    console.error('RegisterUser error:', err);

    // Return a generic 500 Server Error response with error message
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Controller to handle user login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // Get login credentials from request body

  try {
    // Look up the user by email
    const user = await User.findOne({ email });

    // If user not found, respond with error
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with the hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, respond with error
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If login successful, create a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Respond with the user data and token
    res.json({ user, token });

  } catch (err) {
    // Log errors for debugging
    console.error('LoginUser error:', err);

    // Return 500 Server Error response with error message
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
