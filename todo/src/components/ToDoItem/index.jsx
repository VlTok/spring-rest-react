import React from 'react';

import {Tag, Button, Popconfirm, Switch, Tooltip} from 'antd';
import {CloseOutlined, CheckOutlined, QuestionOutlined} from '@ant-design/icons';
import { List } from 'antd';
import {tagStyle, buttonStyle} from './style'
import style from './style.css'
import classNames from 'classnames'


export const TodoItem = ({
    // arg
    todo,
    onTodoRemove,
    onTodoToggle,
    theme
}) => {
    let textColor = todo.isComplete ? 'itemTextGreen':'itemTextRed';
    let itemsBorder = todo.isComplete ? 'itemBorderGreen' : 'itemBorderYellow';
    let isCrossed = todo.isComplete ? 'crossedText':''
    console.log(theme)

    return (
    <List.Item className = {classNames(itemsBorder, 'item')}    
        actions = {[
            <Tooltip title={todo.isComplete ? 'isComplete' : 'UnCompleted'}>          
                <Switch className={todo.isComplete ? "green" : "red"} 
                    checkedChildren = {<CheckOutlined/>}
                    unCheckedChildren ={<CloseOutlined/>}
                    defaultChecked = {todo.isComplete}
                    onChange = {()=> onTodoToggle(todo)}
                    
                    />
                
            </Tooltip>,
            <Popconfirm 
                title = "u realy want delete task?"
                onConfirm = {()=>onTodoRemove(todo)}
                okText = "yes"
                cancelText = "no"
            >
                    <Button className = {classNames('closeButton',`${theme === 'light' ? '':'closeButtonDark'}`)} type='primary' danger><CloseOutlined className = 'closeIcon' /></Button>
            </Popconfirm>
       ]}
        key = {todo.id}
        >
                
                <div>
                    {todo.isComplete ? 
                        <CheckOutlined className = {classNames(`${theme === 'light' ? 'doneIcon':'doneIconDark'}`)} /> : 
                        <QuestionOutlined className = {classNames(`${theme === 'light' ? 'questIcon':'questIconDark'}`)} />}
                    <Tag className={classNames(textColor,'tagStyle',isCrossed,`${theme ==='light' ? '':'tagStyleDark'}`)} >
                        {todo.text}
                    </Tag>
                </div>

        </List.Item>
    )
}
