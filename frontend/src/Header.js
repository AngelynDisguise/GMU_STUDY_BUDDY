import React from 'react';

import PatriotLogo from "./images/patriotLogo.png";
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';

import "./Header.css";

/*Component returns JSX (html+css+js) */
function Header() {
    return (
        <div className="header">
            <PersonIcon className="navButton"/>
            <img alt="Patriot Logo" className="patriotLogo" src={PatriotLogo} />
            <ForumIcon className="navButton"/>
        </div>
    );
}
 
export default Header;