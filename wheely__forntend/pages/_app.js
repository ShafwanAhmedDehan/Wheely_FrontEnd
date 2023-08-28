import '@/styles/globals.css'
import { AuthProvider } from './ValidationLogics/Authentication';

export default function App({ Component, pageProps }) {
  return(    <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>);
}