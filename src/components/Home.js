import React, { useEffect, useState } from 'react'
import {Grid} from '@material-ui/core'
import { Card } from './Card';

//css
import '../css/home.css'


export function Home() {

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(usersList=>{
            setUsers(usersList)
        })
        .catch(err=>{
            console.log(err)
        })
    })

    return (
        <div className="home">
            <h1>USERS</h1>
            <div>
                <Grid container style={{flexGrow:'1'}} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={10}>
                        {
                        users.length ? users.map(user=>{
                            return (
                                <Grid key={user.id} item>
                                    <Card id={user.id} name={user.name} username={user.username}/>
                                </Grid>                        
                                )
                            }) : null
                        }
                    </Grid>
                </Grid>
                </Grid>

                
            </div>
            
        </div>
    )
}
