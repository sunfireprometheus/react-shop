import React, { useState } from 'react'
import { useTranslation } from "react-i18next";

import { useOrder } from '../../../contexts/OrderContext'
import { Button } from '../../Shared/Buttons'
import { DeliveryLocation } from '../../DeliveryLocation'
import { DeliveryModal } from '../../DeliveryLocation/DeliveryModal'
import { DeliveryDateTime } from '../../DeliveryDateTime'


export const Delivery = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ orderDetail ] = useOrder();
  const { t } = useTranslation();

  const closeHandleClick = () => {
    setIsModalOpen(false);
  }

  return (
      <>
        {!orderDetail.currentLocation 
            ? <Button color="primary" width="100%" uppercase={true} onClick={() => setIsModalOpen(true)}>
                { t('Delivery') }
              </Button>
            : <>
                <DeliveryLocation />
                <DeliveryDateTime />
              </> 
        }
        { isModalOpen &&  <DeliveryModal closeHandleClick={closeHandleClick}/> }
      </>
  )
}
