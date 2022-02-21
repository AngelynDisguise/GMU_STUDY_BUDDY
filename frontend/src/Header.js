import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';

/*Component returns JSX (html+css+js) */
function Header() {
    return (
        <div className="header">
            <PersonIcon />
            <ForumIcon />
            <h2>Header</h2>
        </div>
    );
}
 
export default Header;