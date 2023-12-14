import DashbordLayout from '@/components/DashboardLayout'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <Provider store={store}>
      <DashbordLayout>
        <Component {...pageProps} />
      </DashbordLayout>
    </Provider>)

}
