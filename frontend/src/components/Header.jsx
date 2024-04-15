// src/components/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Icon, Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
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
                    <Icon
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </Icon>
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
                    <ListItem  component={RouterLink} to="/" onClick={toggleDrawer(false)}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem  component={RouterLink} to="/events" onClick={toggleDrawer(false)}>
                        <ListItemIcon><EventIcon /></ListItemIcon>
                        <ListItemText primary="Events" />
                    </ListItem>
                    <ListItem  component={RouterLink} to="/create-event" onClick={toggleDrawer(false)}>
                        <ListItemIcon><CreateIcon /></ListItemIcon>
                        <ListItemText primary="Create Event" />
                    </ListItem>
                    <ListItem  component={RouterLink} to="/ticket-list" onClick={toggleDrawer(false)}>
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <ListItemText primary="Ticket List" />
                    </ListItem>
                    <ListItem  component={RouterLink} to="/assign-ticket" onClick={toggleDrawer(false)}>
                        <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
                        <ListItemText primary="Assign Ticket" />
                    </ListItem>
                    <ListItem  component={RouterLink} to="/verify-ticket" onClick={toggleDrawer(false)}>
                        <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
                        <ListItemText primary="Verify Ticket" />
                    </ListItem>
                    {/* Add more navigation links as needed */}
                </List>
            </Drawer>
        </>
    );
};

export default Header;
