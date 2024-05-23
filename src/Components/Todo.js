import React from 'react';
import './Todo.css';
import { useState, useRef, useEffect } from 'react';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function Todo() {

    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const addTodo = () => {
        if (todo !== '') {
            setTodos([...todos, { list: todo, id: Date.now(), status: false, isEditing: false }]);
            console.log(todos);
            setTodo('')
        }
        if(editId){
            const editTodo = todos.find((todo) => todo.id === editId)
            const updateTodo = todos.map((to) => to.id === editTodo.id
            ? (to = { id : to.id , list : todo}) 
            : (to = { id : to.id , list : to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setTodo('')
        }
    }

    const inputRef = useRef('null')

    useEffect(() => {
        inputRef.current.focus()
    })

    const onDelete = (id) => {
        setTodos(todos.filter((to) => to.id !== id))
    }

    const onComplete = (id) => {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return ({ ...list, status: !list.status })
            }
            return list
        })
        setTodos(complete)
    }

    const onEdit = (id) => {
        const editTodo = todos.find((to) => to.id === id)
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }

    return (
        <div className='container'>
            <h1>TODO APP</h1>
            <h3>Get Things Done!🌝 ☕</h3>
            <form className='form-group' onSubmit={handleSubmit}>
                <input type='text' value={todo} placeholder='🖊️ Add item...' ref={inputRef}
                    className='form-control' onChange={(event) => setTodo(event.target.value)} />
                <button type="button" class="btn btn-outline-dark" onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
            </form>
            <div className='list'>
                <ul>
                    {
                        todos.map((to, index) => {
                            return <li key={index} className='form-control'>
                                <div className='list-item-list' id={to.status ? 'list-item' : ''}>{to.list}</div>
                                <span>
                                    <IoCheckmarkDoneCircleOutline
                                        id='complete'
                                        onClick={() => onComplete(to.id)}
                                    />
                                    <FaEdit
                                        className='list-item-icon'
                                        id='edit'
                                        onClick={() => onEdit(to.id)}
                                    />
                                    <MdDeleteOutline
                                        className='list-item-icon'
                                        id='delete'
                                        onClick={() => onDelete(to.id)}
                                    />
                                </span>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Todo;
