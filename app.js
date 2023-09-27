
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./util/database');
const User = require('./models/user');
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login.html page
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './views' });
});

// Serve the signup.html page
app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: './views' });
});

// Serve the expense.html page
app.get('/expense', (req, res) => {
  res.sendFile('expense.html', { root: './views' });
});

app.use('/user', userRoute);
app.use('/expense', expenseRoute);

User.sync()
  .then(() => {
    console.log('User table created successfully.');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });
