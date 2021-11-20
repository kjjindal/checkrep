import React, { useState,useEffect} from "react";
import "../css/Ask.css";
import { Button } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import { selectuser } from "../features/userSlice";
import { useSelector } from "react-redux";
import askimage from '../image/background.svg';
import {Alert} from "@material-ui/lab";



const containerstyle={
    width:'1200px',
    background:`url(${askimage})`,
    backgroundRepeat:'no-repeat',
    backgroundPosition:'right bottom'
}


function Ask() {
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [body, setbody] = useState("");
  const [alert,setalert] =useState(false);

  const [smalltitle, setsmalltitle] = useState(true);
  const [smallbody, setsmallbody] = useState(true);
  const user = useSelector(selectuser);
   
  useEffect(()=>{
setTimeout(()=>{
setalert(false);
},5000)
  },[alert])




  const handleTitle = (e) => {
    settitle(e.target.value);
    if (e.target.value.length >= 90) {
      setsmalltitle(false);
    }
  };

  const handleBody = (e) => {
    setbody(e.target.value);
    if (e.target.value.length >= 193) {
      setsmallbody(false);
    }
  };

  const handleAsk = () => {
    if (!smalltitle && !smallbody) {
      db.collection("questions").add({
        user: user,
        type: type,
        title: title,
        body: body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      settitle("");
      settype("");
      setbody("");
      setalert(true);
    } else {
    }
  };
  return (
    <>
      <div className="ask">
        <div className="ask__container"  style={containerstyle} >
        {alert ? <Alert variant="outlined" severity="success" > Update successfully     </Alert>:null  }
          <h1> ASk a Question </h1>
          <form>
            <div className="form__title">
              <p> title </p>
              <input
                onChange={handleTitle}
                value={title}
                type="text"
                placeholder="e.g. is there an r function for finding the index of an element in a vector"
              />
              {smalltitle ? (
                <small> * title should be atleast 90 </small>
              ) : null}
            </div>

            <div className="form__type">
              <p> type </p>
              <input
                value={type}
                placeholder="e.g. python reactjs "
                type="text"
                onChange={(e) => {
                  settype(e.target.value);
                }}
              />
            </div>
            <div className="form__body">
              <p> body </p>
              <textarea value={body} onChange={handleBody}>
              </textarea>
              {smallbody ? <small> * body should be atleast 193 </small> : null}
            </div>
            <Button disabled={!title || !type || !body} onClick={handleAsk}>
              Post your question
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Ask;
