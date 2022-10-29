import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { CheckoutProgress } from '../CheckoutProgress';
import { useCart } from '../../contexts/CartContext';
import { useOrder } from '../../contexts/OrderContext';
import ApiHooks from '../../hooks/ApiHooks'
import { ResultMessage } from './ResultMessage'
import { DeliveryDetail } from './DeliveryDetail'
import { CartDetail } from './CartDetail'
import { CartTotal } from './CartTotal';
import { OrderDetail } from './OrderDetail'
import { FixedHeader, GobackTitle } from '../Layout/FixedHeader';
import { Button } from '../Shared/Buttons';
import { FixedFooter } from '../Layout/FixedFooter';

import {
  ConfirmContainer,
  MainContent
} from './styles';

export const Confirm = () => {

  const currentLng = localStorage.getItem('i18nextLng');
  const payment_response = 'payment_response'
  const { t } = useTranslation();
  const history = useHistory();
  const { search } = useLocation();
  const [result, setResult] = useState(null)
  const _param = search.split('=')[1] || ''
  const [, { initCart }] = useCart();
  const [orderDetail, { initOrder }] = useOrder();
  const paymentStatusInCash = orderDetail?.orderInfo
  const [paymentStatus] = ApiHooks(`/${payment_response}/${_param}`, {}, 'GET', _param !== 'cashpay')

  const goHome = () => {
    initCart();
    initOrder();
    history.push('/home');
  }

  useEffect(() => {
    if (paymentStatusInCash?.method === 0) {
      setResult(paymentStatusInCash)
      return
    }
    setResult(paymentStatus?.result?.data?.response?.data)
  }, [paymentStatus, paymentStatusInCash])

  return (
    <>
      {result ? (
        <ConfirmContainer>
          <FixedHeader>
            {currentLng === 'en'
              ? <FiArrowLeft size="20" onClick={goHome} />
              : <FiArrowRight size="20" onClick={goHome} />
            }
            <GobackTitle dir="ltr"><span>#{result?.variable1}</span></GobackTitle>
          </FixedHeader>
          <CheckoutProgress step={4} />
          <MainContent>
            <ResultMessage res={paymentStatusInCash?.method !== 0 ? paymentStatus?.result?.success : true} />
            <CartDetail />
            <DeliveryDetail />
            <CartTotal paymentStatus={result} cashPay={paymentStatusInCash?.method !== 0} />
            {paymentStatusInCash?.method !== 0 && <OrderDetail paymentStatus={result} />}
          </MainContent>

          <FixedFooter>
            <Button color="primary" width="100%" onClick={goHome}>
              {t('Go Home')}
            </Button>
          </FixedFooter>

        </ConfirmContainer>
      ) : (
        <ConfirmContainer />
      )}
    </>
  )
}
