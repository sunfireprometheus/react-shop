import React, { useState } from 'react'
import { useConfig } from '../../../contexts/ConfigContext';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from '../../Shared/Buttons'
import { DeliveryModal } from '../../DeliveryLocation/DeliveryModal'
import { useOrder } from '../../../contexts/OrderContext'
import { useCart } from '../../../contexts/CartContext'
import { useProduct } from '../../../contexts/ProductContext'

import {
  ReiviewCartContainer,
  ReviewCart,
  CountPrice,
  ReveiwCount
} from './styles'

export const ReiviewCart = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [configState] = useConfig()
  const [orderDetail] = useOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart] = useCart();
  const [products] = useProduct();

  var totalCount = 0, totalAmount = 0;

  cart.forEach(obj => {
    const prod = products.find(item => item.id === obj.prodId);
    totalAmount += obj.count * prod?.price;
    totalCount += obj.count;
  })

  const closeHandleClick = () => {
    setIsModalOpen(false)
  }

  const goOrder = () => {
    history.push("/order");
  }

  return (
    <ReiviewCartContainer>
      {!orderDetail.currentLocation && cart?.length <= 0
        ? <Button color="primary" width="100%" uppercase={true} onClick={() => setIsModalOpen(true)}>
          {t('Start Ordering')}
        </Button>
        : cart?.length > 0
          ? <Button
            uppercase
            color='primary'
            width="100%"
            onClick={() => { !orderDetail.currentLocation ? setIsModalOpen(true) : goOrder() }}
          >
            <ReviewCart style={{ display: 'flex' }}>
              <CountPrice>
                <ReveiwCount>
                  {totalCount}
                </ReveiwCount>
                {`${totalAmount} ${t(configState?.configs?.currency)}`}
              </CountPrice>
              <span>{t('Review Cart')}</span>
            </ReviewCart>
          </Button>
          : ''
      }
      {isModalOpen && <DeliveryModal closeHandleClick={closeHandleClick} />}
    </ReiviewCartContainer>
  )
}