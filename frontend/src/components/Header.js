import React from 'react';

// material-ui
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';

//styles and images
import PatriotLogo from "../images/patriotLogo.png";
import "../styles/Header.css";

function Header() {
    return (
        <div className="header">
            <IconButton>
                <PersonIcon className="navButton"/>
            </IconButton>
            <img alt="Patriot Logo" className="patriotLogo" src={PatriotLogo} />
            <IconButton>
                <ForumIcon className="navButton"/>
            </IconButton>
        </div>
    );
}
 
export default Header;