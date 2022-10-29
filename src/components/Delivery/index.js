import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { useOrder } from '../../contexts/OrderContext';
import { FixedHeader, GobackTitle } from '../Layout/FixedHeader';
import { MainContent } from '../Layout/MainContent';
import { FixedFooter } from '../Layout/FixedFooter';
import { Button } from '../Shared/Buttons'
import { CheckoutProgress } from '../CheckoutProgress';
import { DeliveryLocation } from '../DeliveryLocation'

import { DeliveryHeader } from './DeliveryHeader'
import { UnitType } from './UnitType'
import { FormsWraper } from './FormsWraper'

import {
  DeliveryContainer,
  DeliverWraper
} from './styles';

export const Delivery = () => {

  const currentLng = localStorage.getItem('i18nextLng');
  const [orderDetail] = useOrder();
  const history = useHistory();
  const { t } = useTranslation();
  const [unitType, setUnitType] = useState(orderDetail.unitType);

  const goBack = () => {
    history.goBack();
  }

  const unitSelect = (val) => {
    setUnitType(val)
  }

  return (
    <DeliveryContainer>
      <FixedHeader>
        {currentLng === 'en'
          ? <FiArrowLeft size="20" onClick={goBack} />
          : <FiArrowRight size="20" onClick={goBack} />
        }
        <GobackTitle>{t('Checkout')}</GobackTitle>
      </FixedHeader>
      <CheckoutProgress step={2} />
      <MainContent>
        <DeliveryHeader />
        <DeliverWraper>
          <DeliveryLocation />
        </DeliverWraper>
        <UnitType unitType={unitType} unitSelect={unitSelect} />
        <FormsWraper unitType={unitType} />
      </MainContent>
      <FixedFooter>
        <Button color="primary" width="100%" type="submit" form="addressForm">
          {t('Next')}
        </Button>
      </FixedFooter>
    </DeliveryContainer>
  )
}
