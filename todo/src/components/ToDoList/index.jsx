import React from 'react';
import {List} from 'antd';
import {TodoItem} from '../ToDoItem';
import FlipMove from 'react-flip-move';

import classNames from 'classnames'

export const TodoList = ({todos,onTodoRemove, onTodoToggle,theme}) =>{
    
    console.log(todos);
    return(
        <List
            dataSource = {todos}
            renderItem = {todo =>(
                    <TodoItem todo = {todo}  onTodoRemove = {onTodoRemove} onTodoToggle = {onTodoToggle} theme = {theme}/>
                )
            }
            locale ={{ //если список пусть, то вывести
                emptyText:"We aren't having tasks",
            }}
            pagination = {{
                position: 'bottom',
                pageSize:10,
                className:classNames('pagination'
                ,`${theme === 'light' ? '':'paginationDark'}`)
            }}
        />
    )
}
