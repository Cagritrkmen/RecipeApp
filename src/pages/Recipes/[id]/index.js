import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeDetails } from '../../../../store/recipeSlice';
import { useEffect } from 'react';
import {
    Typography,
    Container,
    Grid,
    Card,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Divider,
    Box,
    Button,
} from '@mui/material';

const RecipeDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { recipeDetails, loadingRecipeDetails } = useSelector(
        (state) => state.recipes
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeDetails(id));
        }
    }, [id, dispatch]);

    if (loadingRecipeDetails) {
        return <div>Loading...</div>;
    }



    return (
        <Container>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" gutterBottom mt={3} color={"black"}>
                    {recipeDetails.title}
                </Typography>
                <Button style={{height:"50px", marginRight:"40px" ,color:"black"}} variant="contained" color="secondary" onClick={() => { router.back() }}>
                    Geri Dön
                </Button>
            </Box>


            <Grid color={"black"} border={4} borderRadius={10} mt={1} container spacing={4} >
                <Grid item xs={12} sm={4} borderRight={4} pb={3} pl={4} pr={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            width="400"
                            image={recipeDetails.image}
                            alt={recipeDetails.title}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} borderRight={4}>
                    <Typography variant="h5" gutterBottom>
                        İçindekiler:
                    </Typography>
                    <Divider style={{ borderWidth: "3px", borderColor: "third", width: "120px" }} />
                    <List>
                        {recipeDetails.ingredients ? (
                            recipeDetails.ingredients.map((ingredient, index) => (
                                <div key={index}>
                                    <ListItem>
                                        <ListItemText primary={ingredient} />
                                    </ListItem>
                                    {index !== recipeDetails.ingredients.length && (
                                        <Divider style={{ borderWidth: "1px", borderColor: "grey" }} />
                                    )}
                                </div>
                            ))
                        ) : (
                            Array.from({ length: 7 }).map((_, index) => (
                                <ListItem key={index}>
                                    <Skeleton variant="text" width="100%" height="40px" />
                                </ListItem>
                            ))
                        )}
                    </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h5" gutterBottom>
                        Yapılacaklar Listesi:
                    </Typography>
                    <Divider style={{ borderWidth: "3px", borderColor: "third", width: "210px" }} />
                    <List >
                        {recipeDetails.instructions ? (
                            recipeDetails.instructions.map((instruction, index) => (
                                <div key={index}>
                                    <ListItem>
                                        <ListItemText primary={instruction} />
                                    </ListItem>
                                    {index !== recipeDetails.instructions.length && (
                                        <Divider style={{ borderWidth: "1px", borderColor: "grey" }} />
                                    )}
                                </div>

                            ))
                        ) : (
                            Array.from({ length: 7 }).map((_, index) => (
                                <ListItem key={index}>
                                    <Skeleton variant="text" width="50%" height="40px" />
                                </ListItem>
                            ))
                        )}
                    </List>
                </Grid>
            </Grid>




        </Container>
    );
}

export default RecipeDetails;
