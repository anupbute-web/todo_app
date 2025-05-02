const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let todos = [
  { id: 1, task: 'Learn Node.js', priority: 'High' },
  { id: 2, task: 'Write Documentation', priority: 'Medium' },
  { id: 3, task: 'Update Portfolio', priority: 'Low' }
];

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const newTask = req.body.task;
  const priority = req.body.priority;
  if (newTask) {
    todos.push({ id: todos.length + 1, task: newTask, priority });
  }
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const id = parseInt(req.body.id);
  todos = todos.filter(todo => todo.id !== id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
