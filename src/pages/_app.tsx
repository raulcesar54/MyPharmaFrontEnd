import { GlobalStyles, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { storeWrapper } from 'redux/store'
import { theme } from 'theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              margin: 0,
              padding: 0,
              fontSize: '1em',
              backgroundColor: '#18171F',
            },
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </SnackbarProvider>
  )
}
export default storeWrapper.withRedux(MyApp)
