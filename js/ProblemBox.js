import React from 'react';
import '../css/ProblemBox.css';
import {Avatar,Chip} from '@material-ui/core';
import * as timeago from 'timeago.js';
import {setanswer} from '../features/answerSlice';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';


function ProblemBox({type,body,title,timestamp,id,user}){
    const dispatch=useDispatch();
    const history=useHistory();
    const handleAnswer=()=>{
dispatch(setanswer({
    id:id,
    type:type
}));
history.push("/answer");

    }
    return (
        <>
        <div className="problembox">
        <div className="problembox__right">
        <h2 onClick={handleAnswer}> {title}   </h2>
        <p>{body.slice(0,184)}
        {body.length>=184?"...":null}
         </p>
        <Chip  variant="outlined" size="small" label={type}  />
        <div className="problembox__askedby">
            <small>{timeago.format(
                new Date(timestamp?.toDate()).toLocaleString()
            )}</small>
            <p>  Ask by <Avatar  alt={user.displayName} src={user.photo}    />    </p>
        </div>
            
        </div>

        </div>




        </>
    )
}


export default ProblemBox