import {TODO_CONSTANTS } from '../constants';

const initialState = {
    todos: [

    ]
};

export const todoReducer = (state=initialState, action)=>{
    switch(action.type){
        // Добавили запись
        case TODO_CONSTANTS.ADD_TODO_SUCCESS:
            return Object.assign({},state,{
                todos: state.todos.concat({
                    ...action.todo
                })
            })

        case TODO_CONSTANTS.REMOVE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo)=> todo.id !== action.id)
            }
        case TODO_CONSTANTS.REMOVE_ALL_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos
            }

        case TODO_CONSTANTS.TOOGGLE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.map((todo)=>{
                    return todo.id === action.todo_id ? {
                        ...todo, 
                        isComplete:!todo.isComplete
                    } : todo
                })
            }
        case TODO_CONSTANTS.SET_TODOS_SUCCESS:
            return{
                ...state,
                todos: action.todos
            }
        default:
            return state;
    }
}