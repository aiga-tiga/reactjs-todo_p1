import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


function App() {

  const [todos, setTodos] = useState([])
  const[todoValue, setTodoValue] = useState('')
  
  function persisData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodo(newTodo){
    const newTodoList = [...todos, newTodo]
    persisData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persisData(newTodoList)
    setTodos(newTodoList)
    } 

    function handleEditTodo(index){
      const valueTobeEdited = todos[index]

      setTodoValue(valueTobeEdited)
      handleDeleteTodo(index)
    }

    useEffect(() => {
      if(!localStorage){
        return 
      }
      let localTodos = localStorage.getItem('todos')
      if(!localTodos){
        return
      }
      localTodos = JSON.parse(localTodos).todos
      setTodos(localTodos)
    },[])

  return (
    <>
      <TodoInput todoValue = {todoValue} setTodoValue = {setTodoValue} handleAddTodo={handleAddTodo}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo = {handleDeleteTodo} todos={todos}/>
      
    </>
  )
}

export default App
