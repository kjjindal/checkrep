import React from 'react';
import '../css/Header.css';
import stackoverflowlogo from '../image/catchlogo1.png';
import {Menu,Search} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { selectuser } from '../features/userSlice';
import {auth} from './firebase';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router';


function Header(){
    const user=useSelector(selectuser);
    const history=useHistory();

    const handlelogout=()=>{
auth.signOut();
history.push("/");
    }
    return (
        <>
        <div className="header">
        <div className="header__center">
            <Menu  />
            <img src={stackoverflowlogo} alt="stack overflow"  />
            <h3><Link to="/home">
            Stack<span> overflow </span>

            </Link></h3>
            <div className="header__click">
                <p><Link to="/language" > Language    </Link>  </p>
                <p><Link to="/docs" > Docs   </Link>  </p>
                <p><Link to="/admin" > Admin   </Link>  </p>

            </div>
            <div className="header__search">
                <Search />
                <input type="text"  placeholder="search"    />
            </div>
            <div className="header__button">
            {!user?
                <Button className="header__login" > <Link to="/login"> Log In </Link>  </Button>:
                null
            }
            {user?
                <Button className="header__logout"  onClick={handlelogout} > Logout  </Button>:
                null
            }
              
            </div>
        </div>


            
        </div>




        </>
    )
}


export default Header