import React,{ useEffect, useState } from 'react'

import {Button, TextField, FormControl, FormControlLabel, FormGroup, Switch} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

//css
import '../css/todolist.css'

export function Todolist(props) {
    
    const [todo,setTodo] = useState()
    const [newTodo,setNewTodo] = useState()
    
    const {userid} = props.match.params
    
    
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res=>res.json())
        .then(data=>{        
            
            let arr = []
            for(let i=0;i<data.length;i++){
                if(data[i].userId === Number(userid)){
                    
                   arr.push(data[i])
                }
            }
            
            setTodo(arr)
        })
        .catch(err=>console.log(err))
    },[1])

    const switchToComplete = (id)=>{
        setTodo(prevState => {
            const selected = [...prevState];
            // each user has 20 todos 
            // #users = 10
            // #todos = 20*10 = 200
            // we're storing todos of every user but showing todos of only current user
            // therefore to get todo index, we do,
            let index = id%20===0 ? 19 : id%20 - 1
            selected[index].completed = !selected[index].completed;
            return selected;
          })
         
    }
    
    return (
        <div className="todolist">
            <h1 className="todolist__heading">Todo list</h1>
            <div className="todolist__add">
                <TextField
                label="Todo"
                multiline
                variant="outlined"
                name="todo" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}
                style={{width:'900px'}}/>
                <Button value="Add" variant="contained">Add</Button>
            </div>
            
            {
                todo && todo.length ? todo.map(item=>{
                    return (
                        <div key={item.id} className="todolist__all">
                            <h1 className="todolist__todoinfo">{item.title}</h1>
                            <FormControl component="fieldset">                                
                                <FormGroup>
                                    <DeleteIcon style={{color:'maroon',marginBottom:'12px'}}/>
                                    <FormControlLabel
                                    control={<Switch checked={item.completed} onChange={()=>switchToComplete(item.id)} name="isComplete" />}
                                    label={item.completed ? "Completed" : "Incomplete"}
                                    />                                    
                                </FormGroup>                                
                            </FormControl>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}
