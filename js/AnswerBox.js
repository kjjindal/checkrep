import React from 'react';
import '../css/AnswerBox.css';
import {Check,Favorite} from '@material-ui/icons';
import {Avatar} from '@material-ui/core';
import * as timeago from 'timeago.js';
import db from './firebase';
import {useSelector} from 'react-redux';
import {selectanswer} from '../features/answerSlice';




function AnswerBox({likes,votes,solution,submitedBy,timestamp,videolink,id2}){
   
    const secques=useSelector(selectanswer);

    const handleLike=()=>{
        db.collection("questions").doc(secques?.id).collection('answers').doc(id2).update({likes:likes+1})


    }
    const handleVote=()=>{
        db.collection("questions").doc(secques?.id).collection('answers').doc(id2).update({votes:votes+1})

    }

    return(
        <>
<div className="answerbox">
<div className="answerbox__left">
<div className="answerbox__votes">
<p> {votes}  </p>
<p className="answerbox__pbutton" onClick={handleVote}  >  <Check />  </p> 
</div>
<div className="answerbox__answer">
<p> {likes}   </p> 
<p className="answerbox__pbutton2" onClick={handleLike}  >  <Favorite />  </p> 

    
    </div>

</div>
<div className="answerbox__right">
<p>  {solution}  </p>
<div className="answerbox__askedby">
<small>{timeago.format(
                new Date(timestamp?.toDate()).toLocaleString()
            )}</small>
    <p>Answer by <Avatar src={submitedBy.photo} alt={submitedBy.displayName}  />   </p>
</div>
</div>
{videolink && <div className="answerbox__right2"> 
<iframe  src={videolink} title="youtube video link " > </iframe>
   </div>}

</div>


        </>
    )
}


export default AnswerBox