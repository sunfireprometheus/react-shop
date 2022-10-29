import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import { useWindowSize } from '../../hooks/useWindowSize'
import { useCategory } from '../../contexts/CategoryContext'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { Header } from '../Header'
import { Delivery } from './Delivery'
import { Category } from './Category'
import { Products } from './Products'
import { ReiviewCart } from './ReiviewCart'
import { useConfig } from '../../contexts/ConfigContext';
import { SearchInput } from '../Shared/SearchInput'
import { FixedHeader, GobackTitle } from '../Layout/FixedHeader'
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  HomeContainer,
  DeiveryWrapper,
  AllProducts,
  BetweenGray,
  WhatsappContainer,
  ProductSearchWrapper,
  OneEle
} from './styles'

export const Home = (props) => {

  const { isProductSearched, searchProducts } = props
  const { width } = useWindowSize();
  const [categories] = useCategory();
  const [configState] = useConfig()
  const [catId, setCatId] = useState(null);
  const currentLng = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();
  const [scrolledCatId, setscrolledCatId] = useState(1);
  const [searchedText, setSearchedText] = useState('');
  const handleChangeCat = (catId) => {
    setCatId(catId);
    if (catId === null) {
      document.getElementById('rightContainer').classList.remove("spec-category")
      return
    }
    document.getElementById('rightContainer').classList.add("spec-category");
  }

  const searchChange = (e) => {
    const searchText = e.target.value;
    setSearchedText(searchText)
  }
  const searchBack = () => {
    searchProducts(false)
    setSearchedText('')
  }

  useEffect(() => {
    const container = width > 990 ? document.getElementById('homeContainer') : document;
    let topHeight;
    if (width > 990) topHeight = 0;
    if (width > 600 && width <= 990) topHeight = 900;
    if (width <= 600) topHeight = 250;

    const handleScroll = () => {
      const scrollTop = width > 990 ? container.scrollTop : window.pageYOffset;
      categories?.forEach(item => {
        let topPos = document.getElementById(item.id)?.offsetTop + topHeight
        if (Math.abs(scrollTop - topPos) < 73) {
          setscrolledCatId(item.id)
        }
      })
    }

    container?.addEventListener('scroll', handleScroll)
    return () => container?.removeEventListener('scroll', handleScroll)
  }, [categories, width])

  return (
    <HomeContainer id="homeContainer">
      {!isProductSearched && (
        <>
          <Header setCatId={setCatId} />
          <DeiveryWrapper>
            <Delivery />
          </DeiveryWrapper>
          <BetweenGray />
        </>
      )}
      {isProductSearched && (
        <ProductSearchWrapper>
          <FixedHeader>
            {currentLng === 'en'
              ? <FiArrowLeft size="20" onClick={() => searchBack()} />
              : <FiArrowRight size="20" onClick={() => searchBack()} />
            }
            <GobackTitle>{t('Product Search')}</GobackTitle>
          </FixedHeader>
          <OneEle>
            <SearchInput onChange={(e) => searchChange(e)} />
          </OneEle>
        </ProductSearchWrapper>
      )}
      {!(catId || (searchedText !== '' && isProductSearched)) && (
        <Category handleChangeCat={handleChangeCat} catId={catId} scrolledCatId={scrolledCatId} />
      )}
      {(catId || (searchedText !== '' && isProductSearched)) && (
        <AllProducts isNotProductSearched={!isProductSearched}>
          <Products
            catId={catId}
            searchedText={searchedText}
            handleChangeCat={handleChangeCat}
            isProductSearched={isProductSearched}
          />
        </AllProducts>
      )}
      <ReiviewCart />
      <WhatsappContainer href={configState?.configs?.whatsAppUrl} target="_blank" rel="noreferrer">
        <AiOutlineWhatsApp color="white" size="30" />
      </WhatsappContainer>
    </HomeContainer>
  )
}
