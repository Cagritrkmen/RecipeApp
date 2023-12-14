import React from 'react';
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

const RecipeCard = ({ handleFavoriteToggle, isFavorite, recipe }) => {
  const router = useRouter();

  return (
    <Card
      key={recipe.id}
      sx={{ width: 230, height: 380 }}
    >
      {/* Recipe Image */}
      <CardMedia
        component="img"
        height="150"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent>
        {/* Recipe Title */}
        <Typography gutterBottom variant="h6" component="div">
          {recipe.title}
        </Typography>
        {/* Recipe Difficulty */}
        <Typography variant='body2'>Zorluk: {recipe.difficulty}</Typography>
        {/* Recipe Category */}
        {recipe.category}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {/* Recipe Rating */}
          <Rating name="read-only" value={recipe.rating} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({recipe.rating})
          </Typography>
        </Box>
      </CardContent>

      {/* Buttons Section */}
      <Stack direction="row" justifyContent="space-around" mb={3}>
        {/* Detail Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push(`/Recipes/${recipe.id}`)}
        >
          Detaya Git
        </Button>

        {/* Favorite Button */}
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleFavoriteToggle(recipe.id)}
        >
          <FavoriteIcon
            sx={{ fontSize: "40px" }}
            color={isFavorite(recipe.id) ? 'error' : 'disabled'}
          />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default RecipeCard;
