import React, { useEffect, useState } from 'react';
import _ from 'lodash'

import { Row, Col, Card, PageHeader, message, Button , Switch, Affix} from 'antd';

import AddToDoForm from '../components/AddToDoForm/AddToDoForm';
import {addTodo, toggleTodo, getTodos, deleteTodo, deleteAllTodo} from '../store/actions/todo.actions';
import {useDispatch, useSelector} from 'react-redux';
import { TodoList } from '../components/ToDoList';
import Service from '../service/index'
import "./style.css"
import {style} from './style'
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness6Icon from '@material-ui/icons/Brightness6';

import classNames from 'classnames'


export const TodoContainers = () => {

    const [theme,setTheme] = useState('light')

    const isTodoEmpty = (text) =>{
        return !_.isEmpty (text) && _.trim(text).length > 0
    }

    useEffect(()=>{ // Отрабатывает при загрузке страницы (хук)
        console.log('getTodoList');
        dispatch(getTodos());

    },[]);

    const todos = useSelector((state)=>state.todo.todos)
    const dispatch = useDispatch();

    const handlerFormSubmit = (text) => {
        isTodoEmpty(text.text) && dispatch(addTodo(text));
        
        isTodoEmpty(text.text) ?
            message.success(`Todo added successful ${text.text}`)
            : message.error("Todo is empty"); 
    }
    const handlerRemoveTodo = (todo) => {
        dispatch(deleteTodo(todo.id));  
    }
    const handlerRemoveAllTodo = () => {
        dispatch(deleteAllTodo());  
    }
    const handlerToogleTodo = (todo) => {
        dispatch(toggleTodo(todo));
    }
    const switchTheme = () =>{
        theme === 'light' ? setTheme('dark'):setTheme('light');
        console.log(theme)
    }

    const [top, setTop] = useState(10);    
    const [bottom, setBottom] = useState(10);
      


    return(
    <div>
        <header className = 'header' style = {theme ==='light' ? style.headerLight:style.headerNight}>
            <PageHeader className = {classNames(`${theme ==='light' ? '':'headderWhite'}`,`${theme ==='light' ? '':'headerDark'}`)}
                title = "Add Todo"
                subTitle = "Please, add what u want..."
            /> 
            
            <Switch  style = {theme === 'light' ? style.light : style.night}
                    checkedChildren = {<Brightness3Icon className = 'themeIcons'/>}
                    unCheckedChildren ={<Brightness6Icon className = 'themeIcons'/>}
                    onChange = {() => switchTheme()}
                    className = 'themeButton'
            />
            {theme ==='light' ? '':<style>{`
                body {
                    background-color: rgba(0, 0, 0, 0.712);
                }`}
            </style>}
                    
        </header>
        
        <Row
            justify='center'
            align = 'middle'
        >       
            <Col xs ={24} xs={{span:14}}  >
                <Card className = {classNames('formContainer', 
                        `${theme ==='light' ? '':'formContainerDark'}`)}>
                    <AddToDoForm onFormSubmit = {handlerFormSubmit} theme = {theme} />
                </Card>
            </Col>
            <Col xs ={24} xs={{span:14}}>
                <div className = {classNames(`${theme ==='light' ? 'todoListWrapper':'todoListWrapperDark'}`)}>
                    <TodoList 
                        todos = {todos} 
                        onTodoRemove = {handlerRemoveTodo} 
                        onTodoToggle = {handlerToogleTodo}
                        theme = {theme}
                    />
                </div>
            </Col>  
        </Row> 
        <Affix offsetTop={top} style = {{position:'absolute', top:80}}>
            <Button className = 'deleteAllButtton' type="primary" onClick={() => handlerRemoveAllTodo()} danger>
                Delete All
            </Button>
        </Affix> 
        

    </div>
    );
}
