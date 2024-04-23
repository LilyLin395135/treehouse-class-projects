const express = require('express');
const path = require('path');

/* Import route definitions */
const quotesRouter = require('./routes/quotes');

/* Instantiate Express app */
const app = express();

/* Setup view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Express middleware for accessing the req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Static middleware for serving static files*/
app.use('/static', express.static(path.join(__dirname, 'public')));

/* Root route redirect to the '/quotes' route */
app.get('/', (req, res) => {
  res.redirect('/quotes');
});

/* Use route definitions */
app.use('/quotes', quotesRouter);


/* ERROR HANDLERS */
/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
  console.log('404 error handler called');

  /* TODO 1: Send a response to the client
    - Set the response status to 404
    - Render the 'not-found' view
  */
  res.status(404).render('not-found');
});

/* Global error handler */
app.use((err, req, res, next) => {

  if (err) {
    console.log('Global error handler called', err);
  }

  /* TODO 2: Handle errors caught by your route handlers
    - If the error status is 404:
        * Set the response status to 404
        * Render the 'not-found' view and pass the error object to the view
    - Else:
        * Set the error message to the given message, or specify a general, 
          default error message
        * Set response status to the given error status OR, 
          set it to 500 by default if no error status is set
        * Render the 'error' view, passing it the error object
  */
  if (err.status === 404) {
    res.status(404).render('not-found', { err });
  } else {
    err.message = err.message || 'Oops! Something went wrong on the server';
    res.status(err.status || 500).render('error', { err });
  }
});

module.exports = app;
