import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCart } from '../../../contexts/CartContext'
import { useOrder } from '../../../contexts/OrderContext'
import { useAddress } from '../../../contexts/AddressContext'
import { useConfig } from '../../../contexts/ConfigContext';

import {
  CartTotalContainer,
  PriceRow,
  TotalTotal
} from './styles'

export const CartTotal = () => {

  const { t } = useTranslation();
  const [configState] = useConfig()
  const [orderDetail] = useOrder();
  const [cart] = useCart();
  const [, cities] = useAddress();

  const subTotal = cart?.length === 0 ? 0 :
    cart?.length === 1 ? cart[0]?.price * cart[0]?.count : cart.reduce((prev, next) => (prev?.count * prev?.price || prev) + next?.count * next?.price)

  const currentCity = cities.find(obj => obj.id === orderDetail?.currentLocation);
  const deliveryFee = currentCity?.charge ? currentCity?.charge : 0;
  const _coupon = orderDetail?.coupon ?
    (orderDetail?.coupon?.couponType === 'percent' ? orderDetail?.coupon?.couponAmount * subTotal / 100 : orderDetail?.coupon?.couponAmount) : 0
  const totalAmount = subTotal + deliveryFee - _coupon;

  return (
    <CartTotalContainer>
      <PriceRow>
        <div>{t('Subtotal')}</div>
        <div>{`${subTotal} ${t(configState?.configs?.currency)}`}</div>
      </PriceRow>
      <PriceRow>
        <div>{t('Delivery')}</div>
        <div>{`${deliveryFee} ${t(configState?.configs?.currency)}`}</div>
      </PriceRow>
      {_coupon > 0 &&
        <PriceRow>
          <div>{t('Coupon discount')}</div>
          <div>-{_coupon} {t(configState?.configs?.currency)}</div>
        </PriceRow>
      }
      <TotalTotal>
        <div>{t('Total')}</div>
        <div>{`${totalAmount} ${t(configState?.configs?.currency)}`}</div>
      </TotalTotal>
    </CartTotalContainer>
  )
}