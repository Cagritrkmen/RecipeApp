import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipe, fetchRecipes } from '../../../store/recipeSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';



const ManageRecipe = () => {
  const recipes = useSelector(state => state.recipes.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  console.log('recipes', recipes)

  const handleDelete = async (recipeId) => {
    try {
      await dispatch(deleteRecipe(recipeId));
      dispatch(fetchRecipes());

    } catch (error) {
      console.log('Delete failed:', error);
    }
  };

  const handleUpdate = (recipeId) => {
    // Burada güncelleme işlemini gerçekleştirecek olan fonksiyonu çağırabilirsiniz
    // Örnek: history.push(`/update-recipe/${recipeId}`);
    console.log('Update recipe with ID:', recipeId);
  };

  return (
    <Container style={{marginTop:"30px"}}>
      <Box mt={4} margin={"auto"} maxWidth={600}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Başlık</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell>Güncelle veya Sil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map(recipe => (
                <TableRow key={recipe.id}>
                  <TableCell>{recipe.title}</TableCell>
                  <TableCell>{recipe.category}</TableCell>
                  <TableCell>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(recipe.id)}
                      style={{ marginRight: '10px' }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer position='bottom-right' />

      </Box>
      
    </Container>

  );
};

export default ManageRecipe;
