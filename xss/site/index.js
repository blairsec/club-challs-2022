import express from 'express';
import exphbs from "express-handlebars";
import path from 'path';

const app = express()
app.engine('hbs', exphbs.create({ extname: "hbs" }).engine) ;
app.set("view engine", "hbs");
const port = 8080;
app.use(express.static("./static"));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/one', (req, res) => {
  // no restrictions
  res.render('one', { edit: !req.query.c, content: req.query.c });
});

app.get('/two', (req, res) => {
  // no script??
  let content = req.query.c;
  content = content.replace("script", "");
  res.render('two', { edit: !content, content: content });
});

app.get('/three', (req, res) => {
  // no angle brackets??
  let content = req.query.c;
  content = content.replace("<", "");
  res.render('three', { edit: !content, content: content });
});

app.get('/four', (req, res) => {
  // no letters
  let content = req.query.c;
  content = content.replace(/[a-zA-Z]/g, "");
  res.render('four', { edit: !content, content: content });
});


app.listen(port, () => {
  console.log(`Running on port ${port}`)
});
