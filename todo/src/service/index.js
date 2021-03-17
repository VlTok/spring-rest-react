import {host}  from './config';

class Service{

    async getTodoList(){ // Асинхронный, ждёт выполнения await        
        const response = await fetch(`${host}/task`,{// ответ
            method: 'get',
            headers:{
                'Content-Type':'application/json' // Говорим, что получим json
            }
        }); 

        if (!response.ok){
            throw new Error('Проблемы с получением списка задач')
        } 

        const result = await response.json();
        console.log('Gets ...')
        console.log(result.sort(function(task1,task2){
            if (task1.isComplete === false && task2.isComplete === false)
                return 0;
            if (task1.isComplete === true && task2.isComplete === false)
                return 1;
            return -1
        }));
        
        return result;
    }
    
    async addTodoBack(text){ // Асинхронный, ждёт выполнения await        
        const response = await fetch(`${host}/task/`,{// ответ
            method: 'post',
            headers:{
                'Content-Type':'application/json' // Говорим, что получим json
            },
            body:JSON.stringify({
                'text':text   
            })
        }); 

        if (!response.ok){
            throw new Error('Проблемы с добавлением задачи')
        } 
        const result = await response.json();

        console.log(result);
        return result;
    }

    async deleteTodo(id){ // Асинхронный, ждёт выполнения await        
        const response = await fetch(`${host}/task/${id}`,{// ответ
            method: 'delete',
            headers:{
                'Content-Type':'application/json' // Говорим, что получим json
            }
        }); 

        if (!response.ok){
            throw new Error('Проблемы с удалением задачи')
        } 
    }  
    
    async deleteAllTodo(){ // Асинхронный, ждёт выполнения await        
        const response = await fetch(`${host}/task/deleteAll`,{// ответ
            method: 'delete',
            headers:{
                'Content-Type':'application/json' 
            }
        }); 

        if (!response.ok){
            throw new Error('Проблемы с удалением всех задач')
        } 
        const result = await response.json();

        console.log(result);
        return result;
    }  

    async toogleTodo(todo){ // Асинхронный, ждёт выполнения await       
        const response = await fetch(`${host}/task/${todo.id}`,{// ответ
            method: 'put',
            headers:{
                'Content-Type':'application/json' // Говорим, что получим json
            },
            body: JSON.stringify({ 
                'isComplete':!todo.isComplete
            })
           
        }); 

        if (!response.ok){
            throw new Error('Проблемы со сменой статуса задачи')
        } 
        const result = await response.json();

        return result;
    } 

}
export default new Service();