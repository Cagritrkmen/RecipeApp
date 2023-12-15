import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#637E76',
    },
    secondary: {
      main: '#C69774', 
    },
    third: {
      main: '#F8DFD4', 
    },
    forth: {
      main: '#FFEFE8', 
    }
  },
  typography: {
    fontFamily: ' Kalam, sans-serif'
    // Diğer yazı özelliklerini de burada özelleştirebilirsiniz
  }
});

export default theme;
