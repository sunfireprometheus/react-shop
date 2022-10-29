import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { GrDeliver } from "react-icons/gr"
import { useAddress } from '../../contexts/AddressContext'
import { useOrder } from '../../contexts/OrderContext'
import { DeliveryModal } from './DeliveryModal'

import { CustomLink } from '../Shared/CustomLink'

import { 
  LocationContainer,
  LocationName,
  DeliverVal
} from './styles';

export const DeliveryLocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [, cities] = useAddress();
  const [orderDetail] = useOrder();
  const currentLng = localStorage.getItem('i18nextLng');
  const loc = cities.find(obj => obj.id === orderDetail.currentLocation);
  const locationName = currentLng === 'en' ? loc?.name_en : loc?.name_ar;

  const closeHandleClick = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <LocationContainer>
        <LocationName>
          <GrDeliver size="18" />
          <span>{t('Delivery to')}: <DeliverVal>{locationName}</DeliverVal></span>
        </LocationName>
        <CustomLink onClick={() => setIsModalOpen(true) } size={16}>
          {t('Change')}
        </CustomLink>
      </LocationContainer>

      { isModalOpen &&  <DeliveryModal closeHandleClick={closeHandleClick}/> }
    </>
    )
}