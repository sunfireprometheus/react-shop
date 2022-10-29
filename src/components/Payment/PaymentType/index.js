import React from 'react'
// import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
// import { BsCreditCard2FrontFill, BsCashCoin } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { useConfig } from '../../../contexts/ConfigContext';

import {
  UnitTypeMain,
  UnitTypeItem
} from '../../Delivery/UnitType/styles'
import {
  PaymentTypeContainer,
  IconWrapper,
  IconImg,
  PaymentName
} from './styles'

export const PaymentType = (props) => {
  const { payment, handlePayment } = props
  const { t } = useTranslation();
  const [theme] = useTheme()
  const paymentList = ['cash', 'knet', 'credit card']
  const [configState] = useConfig()

  return (
    <PaymentTypeContainer>
      <UnitTypeMain>
        {!configState?.loading && paymentList.map((payType, ii) => configState?.configs[`Payment${ii}`] === "1" && (
          <UnitTypeItem key={`payment-${payType}`} active={payment === payType} onClick={() => handlePayment(payType)}>
            <IconWrapper>
              <IconImg src={theme.images?.payment[payType.replace(/\s*/g, '')]} />
            </IconWrapper>
            <PaymentName>{t(payType)}</PaymentName>
          </UnitTypeItem>
        ))}
      </UnitTypeMain>
    </PaymentTypeContainer>
  )
}