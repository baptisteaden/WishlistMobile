const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const wishRouter = require('./routes/wish');
const friendRouter = require('./routes/friend');
const commentRouter = require('./routes/comment');

const app = express();

//middlewares
app.use(express.static('public'));
app.use(bodyParser.json());

//routes
app.use('/user', userRouter);
app.use('/wish', wishRouter);
app.use('/friend', friendRouter);
app.use('/comment', commentRouter);

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
