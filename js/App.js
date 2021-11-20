import React, { useEffect } from 'react';
import '../css/App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Docs from './Docs';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login, logout } from '../features/userSlice';
import PagenotFound from './PagenotFound';
import Ask from './Ask';
import Answer from './Answer';
import {selectuser} from '../features/userSlice';
import {selectanswer} from '../features/answerSlice';
import {useSelector} from 'react-redux';

function App() {
   const dispatch=useDispatch();
   const user=useSelector(selectuser);
   const answer=useSelector(selectanswer);


   useEffect(()=>{
     auth.onAuthStateChanged((authUser)=>{
       if(authUser){
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName
        }))
       }
       else{
        dispatch(logout());

       }
     })
   })
  




  return (
    <div className="app">
    
    <Router>
    <Header />
<Switch>
<Route path="/login" >
<Login />
  </Route>
  <Route path="/docs" >
<Docs />
  </Route>
  <Route path="/ask" >
  {user?<Ask />:<PagenotFound />}
  </Route>
  <Route path="/pagenotfound" >
<PagenotFound />
  </Route>
  <Route path="/answer" >
  {answer?<Answer />:<PagenotFound />}
  </Route>
  <Route path="/" >
<Home />
  </Route>
<Route>
  <PagenotFound />
</Route>

</Switch>
    </Router>

   
      
    </div>
  );
}

export default App