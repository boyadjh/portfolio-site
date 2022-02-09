const express = require('express');
const favicon = require('express-favicon');
const handlebars = require('express-handlebars');

const path = require('path');
const fs = require('fs');

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
  res.render('blog', {
    layout: 'main',
    helpers: {
      foo() {return ['a', 'b', 'c', 'd']},
      getBlogs() {
        fs.readdir(path.join(__dirname, 'views/partials/blogs'), (err, files) => {
          if(err) {
            return console.log('Error getting blog posts: ' + err);
          }
          console.log(files);
          return files;
        })
      }
    }
  });
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
