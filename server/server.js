const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;



const router = require('./routes/uploads');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/images', express.static('server/data/images')); // use if adding static files to client folder (ie. jpgs)


// route handlers
app.use('/photos', router); // use this endpoint for fetch request in frontend

app.use('/build', express.static(path.join(__dirname, '../build')));
// app.use('/build', express.static(path.join(__dirname, '../dist'))); // /dist? /build?

app.get('/', 
  (req, res) => {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, '../client/index.html'));
      // .sendFile(path.resolve(__dirname, './index.html'));
});

app.use('*', 
  (req,res) => {
    res.status(404).send('Not Found');
});


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { 
      err: 'An error occurred. ERROR: Check server logs for more details.'
    },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;