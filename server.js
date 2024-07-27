const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Dummy user for authentication simulation
const user = {
  email: 'gauravbishtd20@gmail.com',
  password: 'g123' // Never store passwords like this in production
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulate authentication
  if (email === user.email && password === user.password) { 
    res.send({
      token: 'test123' // In a real application, generate a proper token here
    });
  } else {
    // Respond with an error if credentials are invalid
    res.status(401).send('Invalid credentials');
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}/login`));
