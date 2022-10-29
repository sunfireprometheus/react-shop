import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { DeliveryDateTime } from '../DeliveryDateTime'
import { useCart } from '../../contexts/CartContext'
import { OrderItems } from './OrderItems';
import { PromoCode } from './PromoCode';
import { CartTotal } from './CartTotal';
import { FixedHeader, GobackTitle } from '../Layout/FixedHeader';
import { MainContent } from '../Layout/MainContent';
import { FixedFooter } from '../Layout/FixedFooter';
import { Button } from '../Shared/Buttons'
import { Modal } from '../Shared/Modal'
import { useConfig } from '../../contexts/ConfigContext';

import {
  OrderContainer,
  DeiveryWrapper,
  OrderErrorModalWrapper,
  ActionGroup,
  ErrorText
} from './styles'

export const Order = () => {

  const currentLng = localStorage.getItem('i18nextLng');
  const [configState] = useConfig()
  const [cart] = useCart();
  const totalAmount = cart?.length === 0 ? 0 :
    cart?.length === 1 ? cart[0]?.price * cart[0]?.count : cart.reduce((prev, next) => (prev?.count * prev?.price || prev) + next?.count * next?.price)
  const { t } = useTranslation();
  const history = useHistory();
  const [isModal, setIsModal] = useState(false)

  const goBack = () => {
    history.goBack();
  }

  const handleClick = () => {
    if (cart.length <= 0) {
      history.push('/home');
      return
    }
    if (totalAmount < configState?.configs?.minimumAmount) {
      setIsModal(true)
      return
    }
    history.push('/contact');
  }

  const OrderErrorModal = (
    <OrderErrorModalWrapper>
      <ErrorText>{t('Minimum Order Error').replace('_attribute_', configState?.configs?.minimumAmount + t('KWD'))}</ErrorText>
      <ActionGroup>
        <Button color="primary" width="100px" onClick={() => setIsModal(false)}>
          {t('Ok')}
        </Button>
      </ActionGroup>
    </OrderErrorModalWrapper>
  )

  return (
    <>
      <OrderContainer>
        <FixedHeader>
          {currentLng === 'en'
            ? <FiArrowLeft size="20" onClick={goBack} />
            : <FiArrowRight size="20" onClick={goBack} />
          }
          <GobackTitle>{t('Review Cart')}</GobackTitle>
        </FixedHeader>
        <MainContent>
          <DeiveryWrapper>
            <DeliveryDateTime />
          </DeiveryWrapper>
          <OrderItems />
          <PromoCode />
          {cart.length > 0 && <CartTotal />}
        </MainContent>
        <FixedFooter>
          <Button color="primary" width="100%" onClick={handleClick}>
            {cart.length <= 0 ? t('Go to home') : t('Confirmation')}
          </Button>
        </FixedFooter>
      </OrderContainer>
      <Modal
        open={isModal}
        children={OrderErrorModal}
        onClose={() => setIsModal(false)}
        width='400px'
        isHideCloseIcon
      />
    </>
  )
}
