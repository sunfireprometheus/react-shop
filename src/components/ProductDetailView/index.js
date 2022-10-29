import React, { useState } from 'react'
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useConfig } from '../../contexts/ConfigContext';
import { useProduct } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../Shared/Buttons'

import {
  ModalContainer,
  ModalDialog,
  ModalFooter
} from '../Shared/SideModal'

import {
  ProdModalHeader,
  CloseModal,
  ProdMain,
  ProdImg,
  ProdDetail,
  ProdTitle,
  ProdDes,
  ProdPrice,
  ProdToCart
} from './styles';

export const ProductDetailView = (props) => {

  const { prodCloseHandleClick, prodId } = props
  const currentLng = localStorage.getItem('i18nextLng');
  const [configState] = useConfig()
  const [products] = useProduct();
  const [, { addMultiProd }] = useCart();
  const [theme] = useTheme()
  const { t } = useTranslation();
  const [count, setCount] = useState(1);

  const prod = products.find(obj => obj.id === prodId)

  const deCount = () => {
    if (count > 1) setCount(prev => prev - 1);
  }

  const inCount = () => {
    setCount(prev => prev + 1);
  }

  const AddToOrder = () => {
    addMultiProd(prodId, count, prod.price);
    prodCloseHandleClick();
  }

  return (
    <ModalContainer>
      <ModalDialog>
        <ProdModalHeader>
          <CloseModal onClick={prodCloseHandleClick}>
            {currentLng === 'en'
              ? <FiArrowLeft size="20" color="white" />
              : <FiArrowRight size="20" color="white" />
            }
          </CloseModal>
        </ProdModalHeader>
        <ProdMain>
          <ProdImg src={prod.image} alt={prod.name} />
          <ProdDetail>
            <ProdTitle>
              {currentLng === 'en' ? prod.name_en : prod.name_ar}
            </ProdTitle>
            <ProdDes>
              {currentLng === 'en' ? prod.description_en : prod.description_ar}
            </ProdDes>
          </ProdDetail>
          <ProdPrice>
            <div>{t('Price')}</div>
            <div>{`${prod.price} ${t(configState?.configs?.currency)}`}</div>
          </ProdPrice>
          <ProdToCart noQty={prod?.qty === 0}>
            <BsDashCircle
              size={25}
              color={prod.qty !== 0 ? theme.colors?.primaryButtCol : theme.colors?.primaryDisabledCol}
              onClick={() => prod.qty !== 0 && deCount()}
            />
            {count}
            <BsPlusCircle
              size={25}
              color={prod.qty !== 0 ? theme.colors?.primaryButtCol : theme.colors?.primaryDisabledCol}
              onClick={() => prod.qty !== 0 && inCount()}
            />
          </ProdToCart>
        </ProdMain>
        <ModalFooter>
          <Button
            color={prod.qty !== 0 ? 'primary' : 'gray'}
            width="100%" uppercase={true}
            onClick={AddToOrder}
            disabled={prod.qty === 0}
          >
            {prod?.qty !== 0 ? t('Add to order') : t('Item not available')}
            {prod?.qty !== 0 && ` ${count * prod.price} ${t(configState?.configs?.currency)}`}
          </Button>
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  )
}