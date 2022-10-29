import React from 'react'
import { useTranslation } from 'react-i18next';

import { useAddress } from '../../../contexts/AddressContext';
import { useOrder } from '../../../contexts/OrderContext';

import {
  DetailRow,
  DetailTitle,
  DetailVal,
  PartTitle
} from '../styles'
import {
  DeliveryDetailContainer
} from './styles'

export const DeliveryDetail = () => {

  const currentLng = localStorage.getItem('i18nextLng');
  const [orderDetail] = useOrder();
  const [states, cities] = useAddress();

  const { t } = useTranslation();
  const orderedCity = cities.find(obj => obj.id === orderDetail.currentLocation);
  const orderedState = states.find(obj => obj.id === orderedCity?.state_id);
  const unitType = orderDetail.unitType?.charAt(0).toUpperCase() + orderDetail.unitType?.slice(1);

  return (
    <DeliveryDetailContainer>
      <PartTitle>
        {t('Delivery Address')}
        {orderDetail.unitType && `: ${t(unitType)}`}
      </PartTitle>

      <DetailRow>
        <DetailTitle>
          {t('Delivery Time')}:
        </DetailTitle>
        <DetailVal>
          {orderDetail.deiveryTime.date + ' - ' + t(orderDetail.deiveryTime.time)}
        </DetailVal>
      </DetailRow>

      {orderDetail.contact?.name &&
        <DetailRow>
          <DetailTitle>{t('Name')}: </DetailTitle>
          <DetailVal>{orderDetail.contact?.name}</DetailVal>
        </DetailRow>
      }

      {orderDetail.contact?.phone &&
        <DetailRow>
          <DetailTitle>{t('Phone Number')}: </DetailTitle>
          <DetailVal>{orderDetail.contact?.phone}</DetailVal>
        </DetailRow>
      }

      <DetailRow>
        <DetailTitle>
          {currentLng === 'en' ? orderedState?.name_en : orderedState?.name_ar}
          &nbsp;-&nbsp;
          {currentLng === 'en' ? orderedCity?.name_en : orderedCity?.name_ar}

          {orderDetail.address?.block && ` - ${orderDetail.address?.block}`}
          {orderDetail.address?.street && ` - ${orderDetail.address?.street}`}
          {orderDetail.address?.avenue && ` - ${orderDetail.address?.avenue}`}
          {orderDetail.address?.house_no && ` - ${orderDetail.address?.house_no}`}
          {orderDetail.address?.apartment_no && ` - ${orderDetail.address?.apartment_no}`}
          {orderDetail.address?.office_no && ` - ${orderDetail.address?.office_no}`}
          {orderDetail.address?.building && ` - ${orderDetail.address?.building}`}
          {orderDetail.address?.floor && ` - ${orderDetail.address?.floor}`}
          {orderDetail.address?.additional && ` - ${orderDetail.address?.additional}`}

        </DetailTitle>
      </DetailRow>
    </DeliveryDetailContainer>
  )
}