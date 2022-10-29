import React, { useState, useEffect } from 'react'
import moment from "moment";
import "moment-timezone";

import {
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom'
import { useWindowSize } from './hooks/useWindowSize'
import { useOnlineStatus } from './hooks/useOnlineStatus'
import { useTranslation } from "react-i18next";
import { useTheme } from './contexts/ThemeContext';
import { useOrder } from './contexts/OrderContext'
import { useCart } from './contexts/CartContext'
import { AppWrap } from './components/Layout/AppWrap'
import { HelmetTags } from './components/HelmetTags'
import { RightMain } from './components/RightMain'
import { Home } from './pages/Home'
import { Order } from './pages/Order'
import { Contact } from './pages/Contact'
import { Delivery } from './pages/Delivery'
import { Payment } from './pages/Payment'
import { Confirm } from './pages/Confirm'
import { Failure } from './pages/Failure'
import { Loading } from './components/Shared/Loading'

export const App = () => {
  const onlineStatus = useOnlineStatus()
  const [, i18n] = useTranslation()
  const [orderDetail, { updateOrder }] = useOrder();
  const [isProductSearched, setIsProductSearched] = useState()
  const currentHour = moment().tz("Asia/Kuwait").hour();
  const [cart] = useCart();
  const location = useLocation();
  const { width } = useWindowSize();
  const [loaded, setLoaded] = useState(false)
  const [theme, { update }] = useTheme()

  const convertAmPm = (hour) => {
    return hour <= 11 ? hour + 'am' :
      hour === 12 ? hour + 'pm' : (hour - 12) + 'pm'
  }

  const searchProducts = (status) => {
    setIsProductSearched(status)
  }

  const updateDeliveryTime = (orderDetail) => {
    const savedDeliveryMoment = moment(`${orderDetail?.deiveryTime.date}:${orderDetail?.deiveryTime.time}`, "YYYY/MM/DD:ha").tz("Asia/Kuwait")
    const minDeliveryMoment = moment(`${orderDetail?.minDate}:${orderDetail?.isEnabledASAP ? convertAmPm(currentHour + 1) : convertAmPm(orderDetail?.minTime + 1)}`, "YYYY/MM/DD:ha").tz("Asia/Kuwait")
    if (savedDeliveryMoment.diff(minDeliveryMoment, 'hours') < 0) {
      updateOrder({
        deiveryTime: {
          date: orderDetail?.minDate,
          time: orderDetail?.isEnabledASAP ? convertAmPm(currentHour + 1) : convertAmPm(orderDetail?.minTime + 1)
        }
      })
    }
  }

  useEffect(() => {
    if (orderDetail !== undefined && onlineStatus) {
      updateDeliveryTime(orderDetail)
      setLoaded(true)
    }
  }, [orderDetail, cart, onlineStatus])

  useEffect(() => {
    const currentDir = localStorage.getItem('i18nextLng') === 'ar' ? true : false;
    currentDir !== theme.rtl && update({ ...theme, rtl: !theme.rtl });
  }, [i18n])
  return (
    <>
      {!loaded && <Loading />}
      {loaded &&
        <AppWrap>
          <HelmetTags />
          {onlineStatus && (
            <Switch>
              <Route exact path='/home'><Redirect to='/' /></Route>
              <Route exact path='/'><Home isProductSearched={isProductSearched} searchProducts={searchProducts} /></Route>
              <Route exact path='/order'>
                {
                  orderDetail.currentLocation
                    ? <Order />
                    : <Redirect to='/home' />
                }
              </Route>

              <Route exact path='/contact'>
                {
                  orderDetail.currentLocation && cart.length > 0
                    ? <Contact />
                    : <Redirect to='/home' />
                }
              </Route>

              <Route exact path='/delivery'>
                {
                  orderDetail.currentLocation && orderDetail.contact && cart.length > 0
                    ? <Delivery />
                    : <Redirect to='/home' />
                }
              </Route>
              <Route exact path='/payment'>
                {
                  orderDetail.currentLocation && orderDetail.contact && orderDetail.address && cart.length > 0
                    ? <Payment />
                    : <Redirect to='/home' />
                }
              </Route>

              <Route exact path='/confirm'>
                {
                  orderDetail.currentLocation && orderDetail.contact && orderDetail.address && cart.length > 0
                    ? <Confirm />
                    : <Redirect to='/home' />
                }
              </Route>

              <Route exact path='/failure'>
                {
                  orderDetail.currentLocation && orderDetail.contact && orderDetail.address && cart.length > 0
                    ? <Failure />
                    : <Redirect to='/home' />
                }
              </Route>

            </Switch>
          )}

          {(location.pathname === '/' || location.pathname === '/home' || width > 990) &&
            <RightMain
              searchIconShowed={location.pathname === '/' || location.pathname === '/home'}
              searchProducts={searchProducts}
              isProductSearched={isProductSearched} />
          }
        </AppWrap>
      }
    </>
  )
}