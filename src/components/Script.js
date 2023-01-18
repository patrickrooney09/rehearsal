import React, {useEffect, useState}from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import {  getDoc, doc } from "firebase/firestore/lite";
import {  auth, db, getUser } from "../firebase";
import {collection,getDocs} from "firebase/firestore"

const Script = () => {
  const { scriptId } = useParams();
  const id = Number(scriptId)
  const navigate = useNavigate()

  console.log(typeof id)
  const [users, setUsers] = useState([])
  const [script, setScript] = useState({})
  const [scenes, setScenes] = useState({})
  const usersCollectionRef = collection(db, "users")



  useEffect(()=>{
    const getUsers = async()=>{
      const data = await getDocs(usersCollectionRef)
      console.log(data.docs)
      const usersArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
      const currentUser = usersArray.filter((currentUser)=>{
        return currentUser.email === auth.currentUser.email
      })
      console.log("CURRENTUSER", currentUser)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setScript(currentUser[0].scripts[id])
      setScenes(currentUser[0].scripts[id].scenes)
    }
    getUsers()
  },[])

  console.log("USERS", users)
  console.log("CURRENT SCRIPT", script)
  console.log("CURRENTSCENES", scenes)
  return (
    <div className="script-and-scenes">
      <div className="script">
        <div className="circle"></div>
        <h3>{script.title}</h3>
        <p>Role: {script.role}</p>

        <button id="rehearse-button">Read Scene</button>
        <button id="rehearse-button" onClick={()=>{
          navigate(`/script/${scriptId}/buildscene`)
        }}>Build New Scene</button>
      </div>
      <div className="scenes">
        {Object.values(scenes).map((currentScene, index)=>{
          console.log(currentScene)
          return(<div className="scene" id = {index}>
              <div className="circle"></div>Scene {index + 1}
              <button id="rehearse-button" onClick={()=>{
                navigate(`/script/${scriptId}/scene/${index}`)
              }}>Run Lines</button>
            </div>)
        })}
      </div>
    </div>
  );
};

export default Script;
