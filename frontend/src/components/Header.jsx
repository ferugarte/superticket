// src/components/Header.jsx
import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
});

const Header = () => {
      return (
        <>
            <AppBar position="static">
                <StyledToolbar>
                    <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        Super Ticket
                    </Typography>
                </StyledToolbar>
            </AppBar>
        </>
    );
};

export default Header;
