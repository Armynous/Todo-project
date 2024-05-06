import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    _id: uuidv4(),
    title: '',
    description: '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(data => {
        setTodos(data.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Todo created successfully:', data);
        setNewTodo({
          _id: '',
          title: '',
          description: '',
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      })
      .catch(error => {
        console.error('Error creating todo:', error);
      });
  };

  const handleDelete = async (id: string) => {
    const todoId = id;

    await fetch(`http://localhost:8080/api/todos/${todoId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete todo');
        }
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Todos
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
            required
          />
          <br />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
            required
          />
          <br />
          <Button type="submit" color="primary">
            Add Todo
          </Button>
        </form>
        <ul className='text-center'>
          {todos.map(todo => (
            <li key={todo._id}>
              <Typography variant="h6">{todo.title}</Typography>
              <Typography>{todo.description}</Typography>
              <Typography>
                Completed: {todo.completed ? 'Yes' : 'No'}
              </Typography>
              <Button className="btn btn-neutral">Edit</Button>
              <Button onClick={() => handleDelete(todo._id)} color="error">Delete</Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
};

export default App;
