const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./Keys/keys');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');

const app = express();

//DB connect
mongoose.connect(keys.mongoUri, { useNewUrlParser: true }, () => console.log('Database connected..'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send(`<h1>App is running...<h1>`));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));