import React from 'react';
import { Link } from "react-router-dom";

// material-ui
import { IconButton } from '@material-ui/core';
import HelpIcon from '@mui/icons-material/Help';

import "../styles/Footer.css";

function Footer(){
    return(
        <div className='footer-wrapper'>
            <Link to='/help'>
                <IconButton>
                    <HelpIcon/>
                </IconButton>
            </Link>
            
        </div>
    );
}

export default Footer;