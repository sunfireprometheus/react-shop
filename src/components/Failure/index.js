import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ApiHooks from '../../hooks/ApiHooks'
import { CheckoutProgress } from '../CheckoutProgress';
import { useCart } from '../../contexts/CartContext';
import { useOrder } from '../../contexts/OrderContext';
import { ResultMessage } from './ResultMessage'
import { FixedHeader, GobackTitle } from '../Layout/FixedHeader';

import {
  ConfirmContainer,
  MainContent
} from './styles';
import { t } from 'i18next';

export const Failure = () => {

  const currentLng = localStorage.getItem('i18nextLng');
  const payment_response = 'payment_response'
  const location = useLocation();
  const { search } = useLocation();
  const history = useHistory();
  const [, { initCart }] = useCart();
  const [, { initOrder }] = useOrder();

  const _param = search.split('=')[1] || ''

  const [paymentStatus] = ApiHooks(`/${payment_response}/${_param}`, {}, 'GET', _param !== 'cashpay' && _param !== '')

  const goHome = () => {
    initCart();
    initOrder();
    history.push('/home');
  }

  return (
    <>
      {(!paymentStatus.loading) ? (
        <ConfirmContainer>
          <FixedHeader>
            {currentLng === 'en'
              ? <FiArrowLeft size="20" onClick={goHome} />
              : <FiArrowRight size="20" onClick={goHome} />
            }
            <GobackTitle dir="ltr">
              {paymentStatus.result?.data?.response?.data?.variable1 ? (
                <span>#{paymentStatus.result?.data?.response?.data?.variable1}</span>
              ) : (
                <span>{t('Invalid Order')}</span>
              )}

            </GobackTitle>
          </FixedHeader>
          <CheckoutProgress step={4} />
          <MainContent>
            <ResultMessage res={false} />
          </MainContent>
        </ConfirmContainer>
      ) : (<ConfirmContainer />)}
    </>
  )
}
