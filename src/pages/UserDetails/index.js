import React from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logoutUser } from '../../../store/userSlice';
import { ToastContainer, toast } from 'react-toastify';

const UserDetails = () => {
  const user = useSelector(state => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {

    dispatch(logoutUser());
    toast.success("Başarıyla çıkış yapıldı. Login sayfasına yönlendiriliyorsunuz.")
    setTimeout(() => {
      router.push('/Login');
    }, 2000)

  };

  const isAdmin = user && user.user && user.user.role === 'admin';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Paper sx={{ padding: '20px', maxWidth: '450px', width: '100%', marginBottom: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>Kullanıcı Detayları</Typography>
        <Typography ><strong>Ad:</strong> {user && user.user ? user.user.username : 'Bilgi bulunamadı'}</Typography>
        <Typography ><strong>E-posta:</strong> {user && user.user ? user.user.email : 'Bilgi bulunamadı'}</Typography>
        <Typography ><strong>İsim:</strong> {user && user.user ? user.user.name : 'Bilgi bulunamadı'}</Typography>
        <Typography ><strong>Soyisim:</strong> {user && user.user ? user.user.surname : 'Bilgi bulunamadı'}</Typography>
      </Paper>
      {user && user.user && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button
            variant="contained"
            color="third"
            onClick={() => router.push(`/UserDetails/EditUser/${user.user.id}`)}
            style={{ marginRight: '10px' }}
          >
            Kullanıcı Bilgilerini Güncelle
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            style={{ marginRight: '10px' }}
          >
            Çıkış Yap
          </Button>
        </Box>
      )}

      {isAdmin && (
        <Paper sx={{ padding: '20px', maxWidth: '450px', width: '100%', marginTop: "25px" }}>
          <Typography variant="h5" align="center">Admin Paneli</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button variant="contained" color='secondary' onClick={() => router.push("/ManageRecipe")} sx={{ mr: 2 }}>Tarifleri Yönet</Button>
          </Box>
        </Paper>
      )}
      <ToastContainer progressClassName="toastProgress"
        bodyClassName="toastBody" position='bottom-right' />
    </Box>
  );
};

export default UserDetails;
