import '../styles/globals.css'
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from '../redux/store'
import { NextUIProvider } from '@nextui-org/react';
import ModalController from 'components/app/ModalController';

const FatApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <NextUIProvider>
      <Component {...pageProps} />
      <ModalController />
    </NextUIProvider>
  </Provider>
);

export default FatApp