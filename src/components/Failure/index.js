import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { CheckoutProgress } from '../CheckoutProgress';
import { useCart } from '../../contexts/CartContext';
import { useOrder } from '../../contexts/OrderContext';
import { ResultMessage } from './ResultMessage'
import { FixedHeader, GobackTitle } from '../Layout/FixedHeader';

import {
  ConfirmContainer,
  MainContent
} from './styles';

export const Failure = () => {

  const currentLng = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const [, { initCart }] = useCart();
  const [, { initOrder }] = useOrder();

  const goHome = () => {
    initCart();
    initOrder();
    history.push('/home');
  }

  return (
    <ConfirmContainer>
      <FixedHeader>
        {currentLng === 'en'
          ? <FiArrowLeft size="20" onClick={goHome} />
          : <FiArrowRight size="20" onClick={goHome} />
        }
        <GobackTitle><span>{t('Order')}</span><span>12345</span></GobackTitle>
      </FixedHeader>
      <CheckoutProgress step={4} />
      <MainContent>
        <ResultMessage res={location.state} />
      </MainContent>
    </ConfirmContainer>
  )
}
