import React from 'react'
import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import { app } from './firebaseConfig';
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"

const SignIn= () => {
  
    const auth=getAuth();
    const [data,setData]=useState({});

    const handleInput=(event)=>{
        let newInput={[event.target.name]:event.target.value};

        setData({...data,...newInput});
    }

    const handleSubmit=()=>{
        signInWithEmailAndPassword(auth,data.email,data.password).then((response)=>{
        console.log(response.user)
        })
        .catch((err)=>{
            alert(err.message);
        console.log(err);
        })
    };
    return (
        <div className="App">
            <input
                name="email"
                placeholder='Email'
                onChange={(event)=>handleInput(event)}
            />
            <input
                name="password"
                placeholder='Passoword'
                onChange={(event)=>handleInput(event)}
            />
            <hr />

            <button onClick={handleSubmit}>Click Me</button>
        </div>
    )
}

export default SignIn

/*In this method of SignInWithUser 

    If the credentiols of the record does'nt match error is thrown as a alert
    Else if all the credentials matches all the necessary details would be provided within the response.user

*/