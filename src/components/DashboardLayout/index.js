import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import logo from "../../../public/logo.png";

function DashboardLayout({ children }) {
    const router = useRouter();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileClick = () => {
        router.push(`/UserDetails`);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box width={"100%"} position={"absolute"}>
            <AppBar position="static" color='third'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: "pointer",
                            }}
                            onClick={() => (router.push('/'))}
                        >
                            <Image src={logo} alt="My Logo" width={60} height={60} priority />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                variant="contained"
                                color='secondary'
                                onClick={() => router.push(`/Recipes`)}
                                sx={{ my: 2, color: 'white', display: 'block', marginRight: "10px" }}
                            >
                                {"Yemek Tarifleri"}
                            </Button>
                            <Button
                                variant="contained"
                                color='secondary'
                                onClick={() => router.push(`/Favorites`)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {"Favoriler"}
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            {isLoggedIn ? (
                                <Button
                                    variant="contained"
                                    color='secondary'
                                    onClick={handleProfileClick}
                                    sx={{ my: 2, color: 'white', display: "block" }}
                                >
                                    {"Profil"}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        color='secondary'
                                        onClick={() => router.push(`/Login`)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {"Giriş Yap"}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color='secondary'
                                        onClick={() => router.push(`/Register`)}
                                        sx={{ marginLeft:"10px", my: 2, color: 'white', display: 'block' }}
                                    >
                                        {"Kayıt Ol"}
                                    </Button>
                                </>
                            )}
                        </Box>

                        <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 'auto' } }>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenuClick}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => router.push(`/Recipes`)}>Yemek Tarifleri</MenuItem>
                                <MenuItem onClick={() => router.push(`/Favorites`)}>Favoriler</MenuItem>
                                {isLoggedIn ? (
                                    <MenuItem onClick={handleProfileClick}>Profil</MenuItem>
                                ) : (
                                    <>
                                        <MenuItem onClick={() => router.push(`/Login`)}>Giriş Yap</MenuItem>
                                        <MenuItem onClick={() => router.push(`/Register`)}>Kayıt Ol</MenuItem>
                                    </>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                {children}
            </Box>
        </Box>
    );
}

export default DashboardLayout;
