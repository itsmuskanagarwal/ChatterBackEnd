let express = require('express');
  path = require('path');
  const mongoose = require('mongoose');
  mongoose.set('strictQuery', true);
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoDb = require('./database/db');
 
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database sucessfully connected ')
  },
  error => {
    console.log('Database error: ' + error)
  }
)
 
const userRoute = require('./routes/user.routes')
 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
 
// Static directory path
app.use(express.static('E:/Angular/ChatApp/Chatter'));
 
 
// API root
app.use('/api', userRoute)
 
// PORT
const port = process.env.PORT || 3000;
 
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
 
// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});
 
// Base Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});
 
app.get('*', (req, res) => {
  res.sendFile('"E:/Angular/ChatApp/Chatter/src/index.html"');
});
 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});