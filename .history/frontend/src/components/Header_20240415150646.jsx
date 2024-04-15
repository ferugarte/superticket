// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit'
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            Super Ticket
          </Typography>
          {/* Add additional navigation links if needed */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
