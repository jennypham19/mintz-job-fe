import { Box, createTheme, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const theme = createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          size: 'large',
        },
      },
    },
  });
  return (
    <Box>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
    </Box>
  );
}
