import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import {getUserInfo} from '../util/UserInfo';


// material-ui
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//styles and images
import PatriotLogo from "../images/gmulogo.png";
import "../styles/Header.css";

function Header(props) {
    const [userFirstName, setUserFirstName] = useState(null);

    useEffect(() => {
        console.log("Header.js: useEffect()");
        getUserInfo(props.userEmail).then(user => {if(user) setUserFirstName(user.firstName)});
    }, []); //...not working :(

    return (
        <>
        <div className="header">
            {props.backButton ? (
                <IconButton className='icButton'>
                    <Link to={props.backButton}>
                        <ArrowBackIcon className='navButton' />
                    </Link>
                </IconButton>    
            ) : (
                <IconButton className='icButton'>
                    <Link to="/profile">
                        <PersonIcon className="navButton"/>
                    </Link>
                </IconButton>
            )}
            
            
            
            <IconButton className='icButton'>
                <Link to="/">
                    <img alt="Patriot Logo" className="patriotLogo" src={PatriotLogo} />
                </Link>
            </IconButton>
            <IconButton className='icButton'>
                <Link to="/matches">
                        <DensityMediumIcon className="navButton"/>
                </Link>
            </IconButton>
        </div>
        <div className="user"><b>{userFirstName}</b></div>
        </>
    );
}
 
export default Header;
