import React from 'react';
import google1 from '../image/google.png';
import {auth,provider} from './firebase';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router';
import '../css/Login.css';

function Login(){
    const history=useHistory();
    
    const handleclick=()=>{
        auth.signInWithPopup(provider)
        .then(()=>{
            history.push('/docs')
        })
        .catch((err)=>alert(`this is ${err}`));

    }


    return (
        <>
        <div className="login">
            <Button onClick={handleclick}  ><img src={google1}   alt="google"  /> Login with google  </Button>
        </div>





        </>
    )
}

export default Login