import React, { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';
import { createAdd, createRemove, createToggele, createSet } from './action'

import './App.css';

let id = 0
const LI_KET = '$_todo_list'

function bindActionsCreators (actionCreates, dispath) {
  const ret = {}

  for(let key in actionCreates) {
    ret[key] = function(...agrs) {
      const actionCreator = actionCreates[key]
      const action = actionCreator(...agrs)
      dispath(action)
    }
  }

  return ret
}

const CreateTodo = memo(function CreateTodo(props) {
  const inputRef = useRef()
  const { addTodo } = props
  const onSubmit = (e) => {
    e.preventDefault()

    let val = inputRef.current.value

    if(val.length) {
      addTodo({
        text: val.trim(),
        complete: false,
        id: ++id
      })

    inputRef.current.value = ''
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" placeholder="请输入。。。" />
      </form>
    </div>
  )
})

function TodoItem(props) {
  const {todo: {text, complete}, currentIndex,  removeTodo, toggleTodo} = props
  const toggle = () => {
    toggleTodo(currentIndex)
  }
  const remove = () => {
    removeTodo(currentIndex)
  }

  return (
    <div>
      <input type="checkbox"  checked={complete} onChange={toggle}/>
      <span className={complete ? 'change': null}>{text}</span>
      <button onClick={remove}>X{currentIndex}</button>
    </div>
  )
}

function Todolist(props) {
  const {todos, removeTodo, toggleTodo} = props
  return (
    <div>
      {
        todos.length ? todos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} currentIndex={index} removeTodo={removeTodo} toggleTodo={toggleTodo} />
        )) : null
      }
    </div>
  )
}

function Todos () {

  const [todos, setTodo] = useState([])

  const dispath = useCallback((actions) => {
    const { type, payload } = actions
    switch (type) {
      case 'set':
        setTodo(payload)
        break;
      case 'add': 
        setTodo((todos) => [...todos, payload])
        break;
      case 'remove':
        setTodo(todos => {
          return todos.filter((todos, idx) => idx!==payload)
        })
        break;
      case 'toggle':
        setTodo((todos => todos.map((todo, i) =>{
          return i === payload ? {...todo, complete: !todo.complete} : todo
        })))
        break;
      default:
        break;
    }
  }, [])
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LI_KET))
    if(todos.length) {
      id = todos[todos.length - 1].id
    }
    dispath(createSet(todos))
  }, [])

  useEffect(() => {
    localStorage.setItem(LI_KET, JSON.stringify(todos))
  }, [todos])
  return (
    <div>
      <CreateTodo {
        ...bindActionsCreators({
          addTodo: createAdd
        }, dispath)
      } />
      <Todolist todos={todos} {
        ...bindActionsCreators({
          removeTodo: createRemove,
          toggleTodo: createToggele
        }, dispath)
      } />
    </div>
  )
}

export default Todos;
