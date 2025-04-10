const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:3000',
      // Allow follow-up middleware to override this CORS for options
      preflightContinue: true,
    }),
);

// Static array to store todos
let todos = [
  { id: 1, title: 'Buy groceries', hasDone: false, isImportant: true },
  { id: 2, title: 'Walk the dog', hasDone: true, isImportant: false }
];

// GET endpoint to fetch all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST endpoint to add a new todo
app.post('/todos', (req, res) => {
  const { title, hasDone, isImportant } = req.body;

  if (typeof title !== 'string' || typeof hasDone !== 'boolean' || typeof isImportant !== 'boolean') {
    return res.status(400).json({ error: 'Invalid todo format' });
  }

  const newTodo = {
    id: todos.length + 1,
    title,
    hasDone,
    isImportant
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Start the server
app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});

