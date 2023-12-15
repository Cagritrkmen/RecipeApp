import * as React from 'react';
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
import Image from 'next/image';
import logo from "../../../public/logo.png";

function DashboardLayout({ children }) {
    const router = useRouter();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    const handleProfileClick = () => {

        router.push(`/UserDetails`);
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
