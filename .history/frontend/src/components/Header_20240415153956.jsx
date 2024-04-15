// src/components/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
});

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static">
                <StyledToolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        Super Ticket
                    </Typography>
                </StyledToolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <List>
                    <ListItem button component={RouterLink} to="/" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/events" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Events" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/about" onClick={toggleDrawer(false)}>
                        <ListItemText primary="About" />
                    </ListItem>
                    {/* Add more navigation links as needed */}
                </List>
            </Drawer>
        </>
    );
};

export default Header;
