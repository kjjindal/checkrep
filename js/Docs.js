import React,{useState,useEffect} from "react";
import "../css/Docs.css";
import { Button,CircularProgress } from "@material-ui/core";
import { selectuser } from "../features/userSlice";
import { useSelector } from "react-redux";
import ProblemBox from "./ProblemBox";
import InfiniteScroll from 'react-infinite-scroll-component';
import db from './firebase';
import {useHistory} from 'react-router-dom';


function Docs() {
  const history=useHistory();
  const user = useSelector(selectuser);
  const [questionlength,setquestionlength]=useState(3);
  const [questions,setquestions]=useState([]);
  const [limitquestions,setlimitquestions]=useState([]);


  useEffect(()=>{
    db.collection("questions").orderBy("timestamp","desc")
.onSnapshot((snapshot)=>{
  setquestions(snapshot.docs.map((doc)=>
  ({
    id:doc.id,
    data:doc.data()
  })
  ))

})
  },[])

  useEffect(()=>{
setlimitquestions(questions.slice(0,3));
  },[questions])

 
  const fetchMoreData=()=>{
    setTimeout(()=>{
      setlimitquestions(limitquestions.concat(questions.slice(questionlength,questionlength+3)))
setquestionlength(questionlength+3);
    },1500);
  }

const handleAskQues=()=>{
  history.push("/ask");
}

  return (
    <>
      <div className="doc">
        <div className="doc__body">
          <div className="doc__header">
            <div className="doc__header1">
              <h1> ALL Questions </h1>
              {user ? <Button onClick={handleAskQues} > ASK Ques </Button> : <Button> Ask Ques </Button>}
            </div>
            <div className="doc__header2">
              <h2> {limitquestions.length}</h2>
              <Button> Filter </Button>
            </div>
          </div>
        <div className="doc__body2">
 <InfiniteScroll
dataLength={limitquestions.length}
next={fetchMoreData}
hasMore={limitquestions.length!==questions.length}
loader={<div className="doc__scroll"><CircularProgress color="inherit"></CircularProgress>  </div>}


> 
{questions.map(({data:{type,title,body,user,timestamp},id})=>(
  <ProblemBox key={id} id={id} type={type} title={title} body={body} user={user} timestamp={timestamp}  />

))}


</InfiniteScroll>    
         
        </div>
      </div>
      </div>
    </>
  );
}

export default Docs;
