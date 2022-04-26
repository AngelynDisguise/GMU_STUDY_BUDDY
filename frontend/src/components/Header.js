import React from 'react';
import { Link } from "react-router-dom";

// material-ui
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//styles and images
import PatriotLogo from "../images/gmulogo.png";
import "../styles/Header.css";

function Header( { backButton } ) {

    return (
        <div className="header">
            {backButton ? (
                <IconButton className='icButton'>
                    <Link to={backButton}>
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
    );
}
 
export default Header;
