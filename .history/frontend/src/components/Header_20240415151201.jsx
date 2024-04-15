// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between',
}));

const LogoTypography = styled(RouterLink)(({ theme }) => ({
    color: theme.palette.common.white,
    textDecoration: 'none',
    fontSize: '1.25rem',
    fontWeight: 'bold',
}));

function Header() {
    return (
        <AppBar position="static">
            <StyledToolbar>
                <LogoTypography to="/">
                    Super Ticket
                </LogoTypography>
                {/* Additional navigation links or elements can go here */}
            </StyledToolbar>
        </AppBar>
    );
}

export default Header;
