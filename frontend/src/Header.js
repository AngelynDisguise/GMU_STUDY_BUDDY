import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';

/*Component returns JSX (html+css+js) */
function Header() {
    return (
        <div>
            <PersonIcon />
            <h2>Header</h2>
            <MessageIcon />
        </div>
    )
}

export default Header