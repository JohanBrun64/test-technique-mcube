import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useLocalStorage from '../hooks/useLocalStorage';
import { AccountCircle } from '@mui/icons-material';
import { redirect } from 'react-router-dom';



export default function ButtonAppBar() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [logged, setLogged] = useLocalStorage('userId', '')

    const clickLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        redirect('/login')
    }

    const clickLogoff = (e: React.MouseEvent) => {
        e.preventDefault()
        setLogged('')
    }

    const displayLogged = () => {
        if (logged) {
            return (
                <AccountCircle onClick={clickLogoff} />
            )
        }
        else {
            return (
                <Button color="inherit" onClick={clickLogin}>Login</Button>
            )
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {displayLogged()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}