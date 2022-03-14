import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7B61FF',
    },
    text: {
      primary: '#FFFFFF71',
    },

    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#18171F',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '14px',
          fontWeight: '500',
          color: '#B9B9BB',
          lineHeight: '165.7%'
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          fontSize: '11px',
          fontWeight: 'initial',
          color: '#000',
        },
        primary: {
          fontSize: '14px',
          fontWeight: 'bolder',
          textTransform: 'uppercase',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          color: '#00000050',
          fontSize: '11px',
          borderRadius: '100px',
          textTransform: 'lowercase',
        },
        contained: {
          borderRadius: '8px',
          maxHeight: '52px',
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
            cursor: 'pointer'
          },
          '&:disabled': {
            background: '#7B61FF50',
            color: '#ffffff50',
            cursor: 'not-allowed'
          
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          maxHeight: '46px',
          outline: 'none',
          background: '#1D1C23',
          borderRadius: '8px',
          border: '1px solid #292832',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          fontWeight: 500,
          color: '#ffffff71',
          paddingTop: '-1px',
        },
      },
    },
  },
})
