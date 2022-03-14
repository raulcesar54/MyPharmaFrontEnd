import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7B61FF'
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
          fontSize: '24px',
          fontWeight: '300',
          color: '#000',
        },
        subtitle1: {
          fontSize: '13px',
          fontWeight: '300',
          color: '#666666',
          lineHeight: '20px',
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
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          maxHeight: '52px',
          border: 'none',
          outline: 'none',
          background: '#F0F0F0',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          fontWeight: 500,
          color: '#292929',
          paddingTop: '2px',
        },
      },
    },
  },
})
