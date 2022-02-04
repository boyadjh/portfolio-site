const express = require('express');
const favicon = require('express-favicon');
const handlebars = require('express-handlebars');

const port = 3000;

const app = express();

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
  layoutsDir: './views/layouts',
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: './views/partials'
}));

app.use(express.static('public'));

app.use('/favicon.ico', express.static('public/favicon.ico'));

app.get('/', (req, res) => {
  res.render('index', {layout: 'main'});
});

app.get('/blog', (req, res) => {
  res.render('blog', {layout: 'main'});
});

app.get('/projects', (req, res) => {
  res.render('projects', {layout: 'main'});
});

app.get('/about', (req, res) => {
  res.render('about', {layout: 'main'});
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
