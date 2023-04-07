import '../styles/globals.css'
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from '../redux/store'
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import { me } from 'redux/slices/App';
import { useEffect } from 'react';

const FatApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    const token = localStorage.getItem('__fat_token__')
    if (token) {
      store.dispatch(me())
    }
  }, [])
  
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Component {...pageProps} />
        <ToastContainer
          autoClose={3000}
          newestOnTop
          closeOnClick
          hideProgressBar
          limit={2}
          rtl={false}
          pauseOnHover={false}
          pauseOnFocusLoss
          draggable
          theme='colored'
          position='bottom-right'
        />
      </NextUIProvider>
    </Provider>
)}

export default FatApp