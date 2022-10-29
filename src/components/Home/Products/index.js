import React, { useEffect, useState } from 'react'
import { useConfig } from '../../../contexts/ConfigContext';
import { useTranslation } from "react-i18next";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { BsTrash } from "react-icons/bs";
import { BiX } from "react-icons/bi";

import { useProduct } from '../../../contexts/ProductContext'
import { useCategory } from '../../../contexts/CategoryContext'
import { useTheme } from '../../../contexts/ThemeContext'
import { useCart } from '../../../contexts/CartContext'
import { FixedHeader, GobackTitle } from '../../Layout/FixedHeader'
import { ProductDetailView } from '../../ProductDetailView';

import {
  ProductContainer,
  ProductMain,
  ProductDetail,
  ProductItem,
  ProductCount,
  ProductImgWrapper,
  ProductImg,
  ProductTitle,
  ProductDescription,
  ProductPirceAndCartBtn,
  ProductPrice,
  ClosedMessageBack,
  ClosedMessage
} from './styles'

export const Products = (props) => {

  const { catId, handleChangeCat } = props
  const { t } = useTranslation();
  const [theme] = useTheme()
  const currentLng = localStorage.getItem('i18nextLng');
  const [configState] = useConfig()
  const [products] = useProduct();
  const [categories] = useCategory();
  const [cart, { addToCart, removeProd }] = useCart();
  const [data, setData] = useState([]);
  const [prodId, setProdId] = useState(null);

  const cat = categories.find(item => item.id === catId);
  const catName = cat ? (currentLng === 'en' ? cat.name_en : cat.name_ar) : '';

  useEffect(() => {
    const newArr = products.filter(item => item.cat_id === catId);
    setData(newArr);
  }, [catId, products])

  const handleAddToCart = (prodId, price) => {
    addToCart(prodId, price);
  }

  const handleRemoveCart = (prodId) => {
    removeProd(prodId);
  }

  const prodViewHandleClick = (id) => {
    setProdId(id)
  }
  const prodCloseHandleClick = () => {
    setProdId(null)
  }

  return (
    data?.length > 0 &&
    <ProductContainer>
      <FixedHeader>
        {currentLng === 'en'
          ? <FiArrowLeft size="20" onClick={() => handleChangeCat(null)} />
          : <FiArrowRight size="20" onClick={() => handleChangeCat(null)} />
        }
        <GobackTitle>{catName}</GobackTitle>
      </FixedHeader>
      <ProductMain>
        {data.map(item => {
          const matchedProd = cart.find(obj => obj.prodId === item.id);
          return (
            <ProductItem key={item.id} isAdded={matchedProd}>
              <ProductDetail>
                <ProductTitle onClick={() => prodViewHandleClick(item.id)}>
                  {matchedProd && <ProductCount>{matchedProd.count} <BiX color={theme.colors.primaryIconCol} size="25" /> </ProductCount>}
                  {currentLng === 'en' ? item.name_en : item.name_ar}
                </ProductTitle>
                <ProductDescription>
                  {currentLng === 'en' ? item.description_en : item.description_ar}
                </ProductDescription>
                <ProductPirceAndCartBtn>
                  <ProductPrice noQty={item?.qty === 0}>
                    {`${item.price} ${t(configState?.configs?.currency)}`}
                    <AiFillPlusCircle
                      size="24"
                      color={item?.qty !== 0 ? theme.colors.primaryIconCol : theme.colors.primaryDisabledCol}
                      onClick={() => item?.qty !== 0 && handleAddToCart(item.id, item.price)}
                    />
                  </ProductPrice>
                  {matchedProd &&
                    <BsTrash color="#b50000" size="22" onClick={() => handleRemoveCart(item.id)} />
                  }
                </ProductPirceAndCartBtn>
              </ProductDetail>
              <ProductImgWrapper>
                <ProductImg src={item.image} alt={item.name_en} onClick={() => prodViewHandleClick(item.id)} />
                {item?.qty === 0 && (
                  <ClosedMessageBack>
                    <ClosedMessage>{t('Not available')}</ClosedMessage>
                  </ClosedMessageBack>
                )}
              </ProductImgWrapper>
            </ProductItem>
          )
        })}
      </ProductMain>
      {prodId &&
        <ProductDetailView
          prodCloseHandleClick={prodCloseHandleClick}
          prodId={prodId}
        />
      }
    </ProductContainer>
  )
}