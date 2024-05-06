import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

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
    _id: '',
    title: '',
    description: '',
    completed: false,
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTodos(data.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });    
  };

  const handleSubmit = () => {
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
          createdAt: '',
          updatedAt: ''
        });
      })
      .catch(error => {
        console.error('Error creating todo:', error);
      });
  };

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
            </li>
          ))}
        </ul>
        <Button className="btn btn-neutral">Click me</Button>
      </Paper>
    </Container>
  );
};

export default App;
