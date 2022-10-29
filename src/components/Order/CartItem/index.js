import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { BsPlusCircle, BsDashCircle, BsTrash } from "react-icons/bs";
import { useConfig } from '../../../contexts/ConfigContext';
import { useProduct } from '../../../contexts/ProductContext'
import { useCart } from '../../../contexts/CartContext'
import { ProductDetailView } from '../../ProductDetailView'
import { Modal } from '../../Shared/Modal'
import { Button } from '../../Shared/Buttons';

import {
  CartItemContainer,
  DetailRow,
  ItemTitle,
  ItemPrice,
  ItemCountControll,
  ItemCount,
  RemoveIcon,
  RemoveText,
  ActionGroup,
  RemoveProductModalWrapper
} from './styles'

export const CartItem = (props) => {

  const { item } = props
  const { t } = useTranslation();
  const [configState] = useConfig()
  const [cartCount, setCartCount] = useState(item.count)
  const [isModal, setIsModal] = useState(false)
  const [prodId, setProdId] = useState(null);
  const currentLng = localStorage.getItem('i18nextLng');
  const [products] = useProduct();
  const [, { addToCart, removeProd, decreaseItem }] = useCart();
  const prod = products.find(obj => obj.id === item.prodId)

  const decreaseCartItem = () => {
    if (cartCount > 1) {
      setCartCount((prev) => prev - 1)
      decreaseItem(item.prodId);
      return;
    }
    setIsModal(true)
  }

  const increaseCartItem = () => {
    setCartCount((prev) => prev + 1)
    addToCart(item.prodId, item.price);
  }

  const removeCartItem = () => {
    setIsModal(true)
  }

  const prodViewHandleClick = (id) => {
    setProdId(id)
  }
  const prodCloseHandleClick = () => {
    setProdId(null)
  }

  const removeProductModal = (
    <RemoveProductModalWrapper>
      <RemoveIcon>
        <BsTrash color="#b50000" size="50" />
      </RemoveIcon>
      <RemoveText>{t('Are you sure to delete this item from the cart')}</RemoveText>
      <ActionGroup>
        <Button color="primary" width="100px" onClick={() => removeProd(item.prodId)}>
          {t('Yes')}
        </Button>
        <Button width="100px" onClick={() => setIsModal(false)} outLine>
          {t('No')}
        </Button>
      </ActionGroup>
    </RemoveProductModalWrapper>
  )
  return (
    <>
      <CartItemContainer>
        <DetailRow>
          <ItemTitle onClick={() => prodViewHandleClick(item.prodId)}>
            {currentLng === 'en' ? prod?.name_en : prod?.name_ar}
          </ItemTitle>
          <ItemPrice>
            {`${prod?.price} ${t(configState?.configs?.currency)}`}
          </ItemPrice>
        </DetailRow>
        <DetailRow>
          <ItemCountControll>
            <BsDashCircle size="25" onClick={decreaseCartItem} />
            <ItemCount>{cartCount}</ItemCount>
            <BsPlusCircle size="25" onClick={increaseCartItem} />
          </ItemCountControll>
          <BsTrash color="#b50000" size="22" onClick={removeCartItem} />
        </DetailRow>

        {prodId &&
          <ProductDetailView
            prodCloseHandleClick={prodCloseHandleClick}
            prodId={prodId}
            canToCart={true}
          />
        }
      </CartItemContainer>
      <Modal
        open={isModal}
        children={removeProductModal}
        onClose={() => setIsModal(false)}
        width='400px'
        isHideCloseIcon
      />
    </>

  )
}