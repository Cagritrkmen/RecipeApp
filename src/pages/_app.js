import DashbordLayout from '@/components/DashboardLayout'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Yemek Tarifleri</title>
        <link
          rel="icon"
          href="/logo.png"
          type="image/png"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <DashbordLayout>
            <Component {...pageProps} />
          </DashbordLayout>
        </Provider>
      </ThemeProvider>
    </>
  )
}
