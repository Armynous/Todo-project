import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'

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
    fetch('https://1e0a-118-172-58-161.ngrok-free.app')
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

    fetch('https://1e0a-118-172-58-161.ngrok-free.app', {
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

    await fetch(`https://1e0a-118-172-58-161.ngrok-free.app/${todoId}`, {
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

  const updateTodo = async (todoId: string, newData: Partial<Todo>) => {
    try {
      await fetch(`https://1e0a-118-172-58-161.ngrok-free.app/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


  const handleEdit = async (todo: Todo) => {
    Swal.fire({
      title: 'Edit Todo',
      html:
        `<input id="swal-input-title" class="swal2-input" value="${todo.title}">` +
        `<input id="swal-input-description" class="swal2-input" value="${todo.description}">`,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('swal-input-title') as HTMLInputElement).value;
        const description = (document.getElementById('swal-input-description') as HTMLInputElement).value;


        updateTodo(todo._id, { title, description });
      }
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
              <Button onClick={async () => handleEdit(todo)} className="btn btn-neutral">Edit</Button>
              <Button onClick={() => handleDelete(todo._id)} color="error">Delete</Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
};

export default App;
