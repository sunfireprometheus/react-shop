import React from 'react'
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../contexts/ConfigContext';

import {
  CartDetailContainer,
  CartCountTotal,
  PriceRow,
  TotalTotal
} from './styles'

export const CartTotal = (props) => {
  const { paymentStatus, cashPay } = props
  const { t } = useTranslation();
  const [configState] = useConfig()

  const payMethod = paymentStatus?.method === 0 ? 'cash' :
    paymentStatus?.method === 1 ? 'kent' : 'credit card'
  return (
    <CartDetailContainer cashPay={cashPay} >
      <CartCountTotal>
        <PriceRow>
          <div>{t('Subtotal')}</div>
          <div>{`${paymentStatus?.variable2} ${t(configState?.configs?.currency)}`}</div>
        </PriceRow>
        <PriceRow>
          <div>{t('Delivery')}</div>
          <div>{`${paymentStatus?.variable3} ${t(configState?.configs?.currency)}`}</div>
        </PriceRow>
        {paymentStatus.variable4 > 0 &&
          <PriceRow>
            <div>{t('Coupon discount')}</div>
            <div>-{paymentStatus.variable4} {t(configState?.configs?.currency)}</div>
          </PriceRow>
        }
        <TotalTotal>
          <div>{t('Total')}</div>
          <div>{`${paymentStatus?.amount} ${t(configState?.configs?.currency)}`}</div>
        </TotalTotal>

        <TotalTotal>
          <div>{t('Payment Method')}</div>
          <div>{t(payMethod)}</div>
        </TotalTotal>
      </CartCountTotal>
    </CartDetailContainer>
  )
}