import {
  Button,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from '@material-ui/core'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import React, { useState } from 'react'
import db from './firebase'
import { makeStyles } from '@material-ui/core'
import "./Todo.css"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btnTodo: {
    color: 'blue',
  },
}))

function Todo(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState()
  const [inputTitle, setInputTitle] = useState()

  const [lineVisible, setLineVisible] = useState(false)

  const toggleClass = () => {
    console.log("okey 🐱‍🏍🐱‍🏍🐱‍🏍")
    setLineVisible(!lineVisible)
  }


  const handleOpen = () => {
    setOpen(true)
  }
  const updateTodo = () => {
    // Update the todo with the new input text
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
        todoTitle: inputTitle,
      },
      { merge: true },
    )
    setOpen(false)
  }

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)} style={{marginLeft:"calc(50vw - 200px)", marginTop: "calc(50vh - 110px)" }}>
        <div className={classes.paper} style={{display:"flex", flexDirection: "column"}}>
          <h1>Edit Todo</h1>
          <Input
            placeholder={props.todo.todoTitle}
            value={inputTitle}
            onChange={(event) => setInputTitle(event.target.value)}
            style={{marginBottom: "1rem"}}
          />
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            style={{marginBottom: "1rem"}}
          />
          <Button className={classes.btnTodo} onClick={updateTodo}>
            Update TODO
          </Button>
        </div>
      </Modal>
      <List className="todo__list" >
        <ListItem>
          {/* <ListItemAvatar></ListItemAvatar> */}
          <ListItemText
            primary={props.todo.todoTitle}
            secondary={props.todo.todo}
            onClick={toggleClass}
            className={lineVisible ? "line" : ""}
          />
          <Button style={{ cursor: 'pointer' }} onClick={(e) => setOpen(true)}>
            Edit
          </Button>
          <DeleteForeverIcon
            style={{ cursor: 'pointer' }}
            onClick={(event) => {
              db.collection('todos').doc(props.todo.id).delete()
            }}
          />
        </ListItem>
      </List>
    </>
  )
}

export default Todo
