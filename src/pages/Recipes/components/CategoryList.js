import PropTypes from 'prop-types';
import { Divider, List, ListItem, ListItemText, Typography, ListItemButton, Stack, styled } from '@mui/material';

const StyledCategoryListStack = styled(Stack)`
  border-radius: 4px;
  background: #F8DFD4;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  height: fit-content;
`;

const CategoryList = ({ categories, handleCategoryClick }) => {
  return (
    <StyledCategoryListStack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Typography variant="h4" color="grey">
        Kategoriler
      </Typography>
      <List component="nav">
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(category)}>
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledCategoryListStack>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default CategoryList;
