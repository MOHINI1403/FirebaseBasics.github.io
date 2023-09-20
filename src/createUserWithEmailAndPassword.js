import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import { app } from './firebaseConfig';
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"

import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
function CreateUserWithUserAndPassword() {
  const auth=getAuth();
  const [data,setData]=useState({});

  const handleInput=(event)=>{
    let newInput={[event.target.name]:event.target.value};

    setData({...data,...newInput});
  }

  const handleSubmit=()=>{
    createUserWithEmailAndPassword(auth,data.email,data.password).then((response)=>{
      console.log(response.user)
    })
    .catch((err)=>{
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
  );
}

export default CreateUserWithUserAndPassword;
