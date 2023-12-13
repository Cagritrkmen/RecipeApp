import React from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const UserDetails = () => {
  const user = useSelector(state => state.user);
  const router = useRouter();

  const isAdmin = user && user.user && user.user.role === 'admin';
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Paper sx={{ padding: '20px', maxWidth: '450px', width: '100%', marginBottom: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>Kullanıcı Detayları</Typography>
        <Typography ><strong>Ad:</strong> {user && user.user ? user.user.username : 'Bilgi bulunamadı'}</Typography>
        <Typography ><strong>E-posta:</strong> {user && user.user ? user.user.email : 'Bilgi bulunamadı'}</Typography>

      </Paper>

      {isAdmin && (
        <Paper sx={{ padding: '20px', maxWidth: '450px', width: '100%' }}>
          <Typography variant="h5" align="center">Admin Paneli</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button variant="contained" onClick={() => router.push("/ManageRecipe")} sx={{ mr: 2 }}>Tarifleri Yönet</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default UserDetails;
