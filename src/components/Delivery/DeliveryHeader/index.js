import React from 'react'
import { useTranslation } from "react-i18next";

import {
  DeliveryHeaderContainer
} from './styles'
export const DeliveryHeader = () => {
  const {t} = useTranslation();
  return (
    <DeliveryHeaderContainer>
      {t('Delivery Address')}
    </DeliveryHeaderContainer>
  )
}