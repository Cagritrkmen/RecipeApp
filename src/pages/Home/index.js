import { useRouter } from 'next/router';
import { Box, Button, Container, Typography } from '@mui/material';

const Home = () => {
  const router = useRouter();

  const handleRecipeClick = () => {
    router.push('/Recipes');
  };

  return (
    <Container maxWidth="max"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/background.jpg')`,
        backgroundSize: 'cover',
        height: 'calc(100vh - 69px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '0', // Sayfanın kenar boşluklarını kaldırır
        padding: '0', // İçeriğin kenar boşluklarını kaldırır
      }}
    >
      <Box sx={{ textAlign: 'center', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Yemek Tarifleri Sitesine Hoş Geldiniz
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleRecipeClick}
          sx={{ marginTop: '30px' }}
        >
          Yemek Tariflerini Gör
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
