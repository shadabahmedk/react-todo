const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

let todos = [];
let idCounter = 1;

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: idCounter++,
    text: req.body.text,
    completed: false,
  };
  todos.push(todo);
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id, 10));
  res.json({ message: 'Todo deleted' });
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id, 10));
  if (todo) {
    todo.completed = req.body.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
