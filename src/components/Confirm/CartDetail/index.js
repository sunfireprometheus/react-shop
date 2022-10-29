import React from 'react'
import { useTranslation } from 'react-i18next';
import { GrFormClose } from "react-icons/gr";

import { useConfig } from '../../../contexts/ConfigContext';
import { useProduct } from '../../../contexts/ProductContext';
import { useCart } from '../../../contexts/CartContext';

import {
  PartTitle
} from '../styles'

import {
  CartDetailContainer,
  CartContainer,
  ProdItem,
  ProdTitleAndCount,
  ProdTitle,
  ProdCount,
  ProdImg
} from './styles'

export const CartDetail = () => {
  const currentLng = localStorage.getItem('i18nextLng');
  const [configState] = useConfig()
  const { t } = useTranslation();
  const [products] = useProduct();
  const [cart] = useCart();

  return (
    <CartDetailContainer>
      <PartTitle>
        {t('Order details')}
      </PartTitle>

      <CartContainer>
        {cart.map(item => {
          const prod = products.find(obj => obj.id === item.prodId);
          return (
            <ProdItem key={item.prodId}>
              <div>
                <ProdTitleAndCount>
                  <ProdTitle>{currentLng === 'en' ? prod?.name_en : prod?.name_ar}</ProdTitle>
                  <ProdCount>{`${prod?.price} ${t(configState?.configs?.currency)}`}<GrFormClose size={18} /> {item.count}</ProdCount>
                </ProdTitleAndCount>
              </div>
              <ProdImg src={prod?.image} />
            </ProdItem>
          )
        })}
      </CartContainer>
    </CartDetailContainer>
  )
}