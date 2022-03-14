import { ThemeProvider, GlobalStyles } from '@mui/material'
import type { AppProps } from 'next/app'
import { theme } from 'theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  )
}

export default MyApp
