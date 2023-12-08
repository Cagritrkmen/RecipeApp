import * as React from 'react';
import { useSelector } from 'react-redux'; // Redux'tan state almak için kullanılan bir fonksiyon
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
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); // Redux'tan isLoggedIn durumunu al

    const handleProfileClick = () => {
        // Kullanıcı profiline tıklanınca yapılacak işlemler buraya gelecek
        router.push(`/UserDetails`); // Örnek olarak Profile sayfasına yönlendirme yapılıyor
    };

    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
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
                            <Image src={logo} alt="My Logo" width={60} height={60} />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                onClick={() => router.push(`/Recipes`)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {"Yemek Tarifleri"}
                            </Button>
                            <Button
                                onClick={() => router.push(`/Favorites`)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {"Favoriler"}
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            {isLoggedIn ? (
                                <Button
                                    onClick={handleProfileClick}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {"Profil"}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => router.push(`/Login`)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {"Giriş Yap"}
                                    </Button>
                                    <Button
                                        onClick={() => router.push(`/Register`)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
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
