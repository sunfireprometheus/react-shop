import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router } from './router'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'

import { ConfigProvider } from './contexts/ConfigContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AddressProvider } from './contexts/AddressContext'
import { CategoryProvider } from './contexts/CategoryContext';
import { ProductProvider } from './contexts/ProductContext';
import theme from './theme.json'

import mainBg from './assets/images/main-bg.png'
import logo from './assets/images/logo.png'
import Knet from './assets/images/knet.svg'
import Visa from './assets/images/visa.svg'
import cashIcon from './assets/images/paymentIcons/cash.png'
import creditcardIcon from './assets/images/paymentIcons/creditcard.png'
import KnetIcon from './assets/images/paymentIcons/Knet.png'
import masterIcon from './assets/images/paymentIcons/master.png'
import visaIcon from './assets/images/paymentIcons/visa.png'
import emptyCart from './assets/images/empty.png'
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import ReactLoading from 'react-loading';

theme.images = {
  mainBg,
  logo,
  Knet,
  Visa,
  emptyCart,
  payment: {
    cash: cashIcon,
    creditcard: creditcardIcon,
    knet: KnetIcon,
    visa: visaIcon,
    master: masterIcon
  }
}

theme.rtl = localStorage.getItem('i18nextLng') === 'ar' ? true : false;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar'],
    lng: "en",
    fallbackLng: "ar",
    detection: {
      order: ['localStorage', 'htmlTag'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/locales/{{lng}}.json'
    }
  });

const RouteApp = () => {
  return (
    <Suspense fallback={<ReactLoading type='bubbles' color='#5586df' height={'150px'} width={'150px'} />}>
      <ConfigProvider>
        <OrderProvider>
          <ProductProvider>
            <CategoryProvider>
              <AddressProvider>
                <CartProvider>
                  <ThemeProvider theme={theme}>
                    <Router />
                  </ThemeProvider>
                </CartProvider>
              </AddressProvider>
            </CategoryProvider>
          </ProductProvider>
        </OrderProvider>
      </ConfigProvider>
    </Suspense>
  )
}

const wrapper = document.getElementById('root')
ReactDOM.render(<RouteApp />, wrapper)