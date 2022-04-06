import React from 'react';
import { Link } from "react-router-dom";

// material-ui
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';

//styles and images
import PatriotLogo from "../images/patlogo.png";
import "../styles/Header.css";

function Header() {
    return (
        <div className="header">
            
            <IconButton>
                <PersonIcon className="navButton"/>
            </IconButton>
            
            <Link to="/">
                <img alt="Patriot Logo" className="patriotLogo" src={PatriotLogo} />
            </Link>
            
            <Link to="/matches">
                <IconButton>
                    <ForumIcon className="navButton"/>
                </IconButton>
            </Link>
        </div>
    );
}
 
export default Header;