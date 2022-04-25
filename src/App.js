import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import firebase from 'firebase/compat/app'
import db from './firebase'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [inputTitle, setInputTitle] = useState('')
  

  // hen the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here... fires when the app.js loads
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            todoTitle: doc.data().todoTitle,
          })),
        )
      })
  }, [])

  const addTodo = (event) => {
    // This will fire off when we click the button
    event.preventDefault() // Will stop the REFRESH of the page
    db.collection('todos').add({
      todoTitle: inputTitle,
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setTodos([...todos, input])
    setInputTitle('') // Clear up the input after click / we add the todo
    setInput('') // Clear up the input after click / we add the todo
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome to TODO App 🚀</h1>
      <form>
        <FormControl style={{ width: '55vw' }}>
          <InputLabel>✔ Write a Todo Title</InputLabel>
          <Input
            value={inputTitle}
            onChange={(event) => setInputTitle(event.target.value)}
          />
        </FormControl>
        <br />
        <FormControl style={{ width: '55vw' }}>
          <InputLabel>✔ Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <br />
        <Button
          disabled={!inputTitle}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          style={{ margin: '1rem', padding: '1rem' }}
        >
          Add Todo
        </Button>
      </form>

      <ul
        style={{
          width: '60vw',
          overflow: 'wrap',
          padding: '0px',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id}/>
        ))}
      </ul>
    </div>
  )
}

export default App
