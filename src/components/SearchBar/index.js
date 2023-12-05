
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import { searchRecipes } from '../../../store/recipeSlice';


export default function SearchBar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(searchRecipes(search));
    }, [search]);

    return (
        <Search >
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Tarif ara"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </Search>

    );
}