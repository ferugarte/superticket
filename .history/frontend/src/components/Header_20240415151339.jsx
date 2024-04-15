// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    Super Ticket
                </Typography>
                {/* Additional navigation links or elements can go here */}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
