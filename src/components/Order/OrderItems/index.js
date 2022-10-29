import React from 'react'
import { useTranslation } from "react-i18next";
import { useCart } from '../../../contexts/CartContext'
import { useTheme } from '../../../contexts/ThemeContext'

import { CartItem } from '../CartItem'
import {
  OrderItemsContainer,
  ItemsHeader,
  NoOrdered,
  EmptyCartMessage,
  EmptyImgWrapper,
  EmptyImg,
  AddItemMessage
} from './styles'

export const OrderItems = () => {

  const { t } = useTranslation();
  const [theme] = useTheme()
  const [cart] = useCart();

  return (
    <OrderItemsContainer>
      {cart.length > 0 && (
        <>
          <ItemsHeader>
            {t('Order Items')}
          </ItemsHeader>
          {cart.map(item =>
            <CartItem item={item} key={item.prodId} />
          )}
        </>
      )}

      {cart.length === 0 &&
        (<NoOrdered>
          <EmptyCartMessage>{t('Your cart is empty')}</EmptyCartMessage>
          <EmptyImgWrapper>
            <EmptyImg src={theme?.images?.emptyCart} />
          </EmptyImgWrapper>
          <AddItemMessage>{t('Browse the menu and add items to your order to proceed')}</AddItemMessage>
        </NoOrdered>
        )}
    </OrderItemsContainer>
  )
}