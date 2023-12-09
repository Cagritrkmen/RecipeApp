import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/router';



const RecipeCard = ({handleFavoriteToggle,isFavorite,recipe}) => {
    const router=useRouter()
    return (
        <Card
            
            key={recipe.id}
            sx={{ width: 250,height:380 }}
        >
            <CardMedia
                component="img"
                height="150"
                image={recipe.image}
                alt={recipe.title}
            />
            <CardContent>
                <Typography mb={3} gutterBottom variant="h6" component="div">
                    {recipe.title}
                </Typography>
                {recipe.category}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Rating name="read-only" value={recipe.rating} readOnly />
                    <Typography variant="body2" color="text.secondary">
                        ({recipe.rating})
                    </Typography>
                </Box>
            </CardContent>
            <Stack direction="row" justifyContent="space-around" mb={3} >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => router.push(`/Recipes/${recipe.id}`)}
                >
                    Detaya Git
                </Button>
                {isFavorite && (
                    <IconButton
                        aria-label="add to favorites"
                        onClick={() => handleFavoriteToggle(recipe.id)}
                    >

                        <FavoriteIcon
                            sx={{ fontSize: "40px" }}
                            color={isFavorite(recipe.id) ? 'error' : 'disabled'}
                        />
                    </IconButton>
                )}
            </Stack>
        </Card>
    )
}

export default RecipeCard