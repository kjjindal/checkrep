import React,{useState,useEffect} from 'react';
import '../css/Answer.css';
import {useSelector} from 'react-redux';
import {selectuser} from '../features/userSlice';
import {Button} from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';
import { selectanswer } from '../features/answerSlice';
import AnswerBox from './AnswerBox';


function Answer(){
    const [answer,setanswer]=useState('');
    const [answers,setanswers]=useState([]);
    const [question,setquestion]=useState([]);


    const [videolink,setvideolink]=useState("");
    const user=useSelector(selectuser);
    const secques=useSelector(selectanswer);
     

    const handleVideoLink=(e)=>{
        setvideolink(e.target.value);
    }


    const giveAnswer=()=>{

        var regex=/https:\/\/www.youtube\.com\/embed\/*/;
        if(regex.test(videolink)){

            db.collection('questions').doc(secques?.id).collection('answers').add({
                submitedBy:user,
                solution:answer,
                votes:0,
                likes:0,
                videolink:videolink,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        else if(videolink===" "){

            db.collection('questions').doc(secques?.id).collection('answers').add({
                submitedBy:user,
                solution:answer,
                votes:0,
                likes:0,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
        }





    }


    useEffect(()=>{
        db.collection('questions').doc(secques?.id).collection('answers').orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            setanswers(snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            })))
        })
    },[secques?.id])
    
    useEffect(()=>{
        db.collection('questions').doc(secques?.id).get()
        .then(snapshot=>setquestion(snapshot.data()))
        
    },[secques?.id])


    return (
        <>
        <div className="answer">
            <div className="answer__container">
            <form className="answer__form">
            <h1> {question.title} </h1>
            <small>  {question.body}   </small>
            <textarea value={answer} onChange={(e)=>{setanswer(e.target.value)}}  >

            </textarea>
            <input type="text" value={videolink} onChange={handleVideoLink}  placeholder="type video link here for video solution e.g. https:www.youtube.com/embed/A_V2tfgrxj8"  />
<Button  onClick={giveAnswer} disabled={!user || !answer }  >  Post Your Answer  </Button>
            </form>

            </div>
            <div className="answer__already">
                <h2>  Answers  </h2>
                {answers.map(({id,data:{likes,timestamp,votes,solution,submitedBy,videolink}})=>(
                    <AnswerBox id2={id} solution={solution} timestamp={timestamp} likes={likes} votes={votes} submitedBy={submitedBy} videolink={videolink} />
                ))}
            </div>
        </div>



        </>
    )
}

export default Answer