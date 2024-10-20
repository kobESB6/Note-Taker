const express = require('express');
const path = require('path');
const { clog } = require('./public//clog');
const api = require('./routes/htmlRoutes');

const PORT = process.env.port || 3001;

const app = express();



// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);
app.get('/manny', (reg, res) => res.json({ name: 'Manny' }));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
