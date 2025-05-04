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

app.get('/edit/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    res.render('edit', { todo });
  } else {
    res.redirect()
  }
});

app.post('/edit/:id', (req, res) => {
  const { task, priority } = req.body;
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    todo.task = task;
    todo.priority = priority;
    res.redirect('/');
  } else {
    res.status(404).send('Task not found');
  }
});


app.post('/delete', (req, res) => {
  const { id } = req.body;
  todos = todos.filter(todo => todo.id != id);
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
