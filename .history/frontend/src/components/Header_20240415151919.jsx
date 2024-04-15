// src/components/Header.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between', // Centers items on the toolbar
});

const Header = () => {
    return (
        <AppBar position="static">
            <StyledToolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        textDecoration: 'none', // Removes underline from link
                        color: 'inherit', // Inherits the white color from AppBar
                        flexGrow: 1 // Allows the title to take up the full space if no other elements are on the Toolbar
                    }}
                >
                    Super Ticket
                </Typography>
                {/* Add additional navigation links or buttons here if needed */}
            </StyledToolbar>
        </AppBar>
    );
};

export default Header;
