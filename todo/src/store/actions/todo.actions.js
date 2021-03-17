import { TODO_CONSTANTS} from '../constants';
import Service from '../../service/index'

export const addTodo = (todo) => async (dispatch) =>{
    try {
        await Service.addTodoBack(todo.text);
        dispatch({
            type:TODO_CONSTANTS.ADD_TODO_SUCCESS,
            todo: todo
        })

    } catch (err){
        console.log(err.message)
    }
    
    dispatch(getTodos());
}

export function removeTodo(todo){
    return {
        type: TODO_CONSTANTS.REMOVE_TODO_SUCCESS,
        todo_id:todo.id
    }
}


export const toggleTodo = (todo) => async (dispatch) =>{

    try {
        await Service.toogleTodo(todo);
        dispatch({
            type:TODO_CONSTANTS.TOOGGLE_TODO_SUCCESS,
            todo: todo
        })

    } catch (err){
        console.log(err.message)
    }
    dispatch(getTodos())
}

export const getTodos = () => async(dispatch) =>{
    try {
        const todos = await Service.getTodoList();
        dispatch ({
            type: TODO_CONSTANTS.SET_TODOS_SUCCESS,
            todos:todos
        });       

    } catch(err){
        console.log(err.message)
    }
}

export const deleteTodo = (id) => async(dispatch) => {
    try {
        const todo = await Service.deleteTodo(id);
        dispatch({
            type:TODO_CONSTANTS.REMOVE_TODO_SUCCESS,
            id: id
        })

    } catch (err){
        console.log(err.message)
    }
}

export const deleteAllTodo = () => async(dispatch) => {
    try {
        const todo = await Service.deleteAllTodo();
        dispatch({
            type:TODO_CONSTANTS.REMOVE_ALL_TODO_SUCCESS,
            todos:todo
        })

    } catch (err){
        console.log(err.message)
    }
    
    dispatch(getTodos())
}