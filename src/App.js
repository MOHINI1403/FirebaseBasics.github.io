import React, { useCallback, useEffect, useState } from 'react'
import {app,database} from "./firebaseConfig"

//Collection fucntion to add the collection to the database and AddDoc to add the document to the collection
import { collection,addDoc,getDoc, getDocs, doc, updateDoc, deleteDoc, query, where} from 'firebase/firestore'
import {getAuth,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth"
//getDoc this Fetches the data from the firebase collection
const App = () => {
  const [data,setData]=useState({});
  const auth=getAuth();
  //Here we are creating the Collection this would take first argument as collection and second as collection name
  const collectionRef=collection(database,'users');


  const handleInput=(event)=>{
    
    {/*Here event.target.name is when we are doing any changes in any of the input value
      Which input value is changed
  Now the event.target.value gives me the current value this changes every time a new character is added*/}
    let newInput={[event.target.name]:event.target.value};
    {/*This newInput is an object of target.name:target.value type*/}
    setData({...data,...newInput});
  }
  //This query is used to basically use a query to fetch the data over here from the collectionREf and here 
  //where() refers as the
  const ageQuery=query(collectionRef,where("password","<","12"))
  const handleSubmit=()=>{
    addDoc(collectionRef,{
      email:data.email,
      password:data.password
    }).then(()=>{
      alert("Data added");
    })
    .catch((err)=>{
      alert(err.messgae);
    })
      
  };
  {/*This would fetch me all the details of the users*/}
  const getData=()=>{
    getDocs(collectionRef)
    .then((response)=>{
        console.log(response.docs.map((item)=>{
          /*This gives me the id of the items also in the collection present in collectionRef*/
          return {...item.data(),id:item.id};
      }))
    })
  }

  const updateData=()=>{
    //First we need to specify which document to update
    const dataToUpdate=doc(database,"users",'0aZAPkmXhce9bKUc6UIp');
    updateDoc(dataToUpdate,{
      email:'ABC',
      password:'2xcw2'
    })
    .then(()=>{
      alert("Data updated Succesfully");
    })
    .catch((err)=>{
      alert(err.messgae);
    })
  }
  {/*This is used to delete the data from the collection*/}
  const deleteData=()=>{
    const dataToDeleted=doc(database,"users",'0aZAPkmXhce9bKUc6UIp');
    deleteDoc(dataToDeleted)
    .then(()=>{
      alert("Data deleted Succesfully:");

    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  const handlelogout=()=>{
    signOut(auth);
  }
  useEffect(()=>{

    //When the button clicked is logOut it is gonna tell the firebase that we are logged out 
    onAuthStateChanged(auth,(data)=>{
      if(data){
        alert("Logged In");

      }
      else{
        alert("Not Logged In");
      }
    })
  },[])
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

export default App