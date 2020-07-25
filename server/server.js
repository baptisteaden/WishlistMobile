require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const userRouter = require('./routes/user');
const wishRouter = require('./routes/wish');
const friendRouter = require('./routes/friend');
const commentRouter = require('./routes/comment');

const app = express();

// ---------- Middlewares ---------- //

// TODELETE?
app.use(express.static('public'));

// JSON body
app.use(bodyParser.json());

// JWT authorization
app.use(
  expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({ path: ['/', '/user'] }),
);

// JSON Error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).json(err);
    console.log(err);
  } else {
    next();
  }
});

// TMP body params esaping (GraphQL incoming)
app.use((req, res, next) => {
  if (req.body) {
    Object.entries(req.body).forEach(([key, value]) => {
      if (typeof value === 'string') {
        req.body[key] = escape(value);
      }
    });
  }
  next();
});

// ---------- Routes ---------- //

app.get('/', (req, res) => {
  res.json({
    hey: 'Welcome to my wishlist API :)',
    mode: process.env.NODE_ENV,
  });
});
app.use('/user', userRouter);
app.use('/wish', wishRouter);
app.use('/friend', friendRouter);
app.use('/comment', commentRouter);

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port ', process.env.PORT || 5000);
});
