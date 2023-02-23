const express = require('express');

  const mongoose = require('mongoose');
  mongoose.set('strictQuery', true);
  cors = require('cors');
  bodyParser = require('body-parser');
  const dotenv = require("dotenv");
  dotenv.config();
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cors());
  
  // Mongo DB conncetion
const database = process.env.MONGO_URI
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Database sucessfully connected'))
.catch(err => console.log('Database error: ' + err));
 
app.use('/',require('./routes/user.routes'))

// PORT
const port = process.env.PORT || 3000;
 
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
 
// 404 Handler
// app.use((req, res, next) => {
//   next(createError(404));
// });
 
// // Base Route
// app.get('/', (req, res) => {
//   res.send('invaild endpoint');
// });
 
// app.get('*', (req, res) => {
//   res.sendFile('"E:/Angular/ChatApp/Chatter/src/index.html"');
// });
 
// error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });