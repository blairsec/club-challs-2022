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
  // add blacklist
  let content = req.query.c;
  res.render('two', { edit: !content, content: content });
});

app.get('/three', (req, res) => {
  // more blacklist
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/four', (req, res) => {
  // something else
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
  console.log(`Running on port ${port}`)
});
