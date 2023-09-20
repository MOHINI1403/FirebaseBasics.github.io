
import React, { useCallback, useState } from 'react'
import {app,database,storage} from "./firebaseConfig"
import { ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
//Collection fucntion to add the collection to the database and AddDoc to add the document to the collection
import { collection,addDoc,getDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot} from 'firebase/firestore'
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
//getDoc this Fetches the data from the firebase collection
const App = () => {
    const [data,setData]=useState({});
  

    const collectionRef=collection(database,'users');
    const handleSubmit=()=>{
        //The data contains the details of the file selected 
        //data.name fetches the name of the file
        //mountainRef want to create the reference of the firebase location register
        const mountainRef=ref(storage,`images/data.name`);
        
        const uploadTask=uploadBytesResumable(mountainRef,data);
        
        //This is a sort of event handler keeping trck of the progess of the file upload
        uploadTask.on('state_changed',(snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log('Upload is '+progress+'% done');
        },
        (error)=>{
            console.log(error);
        },
        ()=>{
            //If the file upload is succesfull this function fetches the DownLoad URL
            console.log(uploadTask);
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                console.log("File avaliable at:",downloadURL);
            })
        })
       
          
    };
    //Real time update of the data it's getting listened at the real time
    
    const getData=()=>{
        onSnapshot(collectionRef,(data)=>{
            console.log(
                data.docs.map((item)=>{
                    return item.data();
                })
            )
        })
    }
  return (
    <div className="App">
        <input type="file" onChange={(event)=>setData(event.target.files[0])}/>
        
        <hr />

        <button onClick={handleSubmit}>Click Me</button>
    </div>
  )
}

export default App