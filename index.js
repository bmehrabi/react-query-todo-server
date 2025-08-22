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

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// POST endpoint to add a new todo
app.post('/todos', async (req, res) => {
  await delay(2000);
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

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, hasDone, isImportant } = req.body;

    const todoId = parseInt(id, 10);
    const index = todos.findIndex((t) => t.id === todoId);

    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    if (typeof title !== 'string' || typeof hasDone !== 'boolean' || typeof isImportant !== 'boolean') {
        return res.status(400).json({ error: 'Invalid todo format' });
    }

    todos[index] = {
        ...todos[index],
        title,
        hasDone,
        isImportant,
    };

    res.json(todos[index]);
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const todoId = parseInt(id, 10);
    const index = todos.findIndex((t) => t.id === todoId);

    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    const deletedTodo = todos.splice(index, 1)[0];

    res.json({ message: 'Todo deleted', todo: deletedTodo });
});


// Start the server
app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});

