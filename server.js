const express = require('express');
const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoute);
app.use('/', htmlRoute);
app.use(express.static('public'));


// // GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
// );
// app.get('/manny', (reg, res) => res.json({ name: 'Manny' }));

// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT}`)
// );

// fs.writeFile(`./db/db.json`, JSON.stringify(notesArray, null, 2), (err) =>
//   err ? console.error(err) : console.log('Successfully saved.')
// );
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
