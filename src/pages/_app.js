import DashbordLayout from '@/components/DashboardLayout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return( 
  <DashbordLayout >
    <Component {...pageProps} />
  </DashbordLayout>)
}
