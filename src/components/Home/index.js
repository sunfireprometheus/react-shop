import React, { useState, useEffect } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useCategory } from '../../contexts/CategoryContext'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { Header } from '../Header'
import { Delivery } from './Delivery'
import { Category } from './Category'
import { Products } from './Products'
import { ReiviewCart } from './ReiviewCart'
import { useConfig } from '../../contexts/ConfigContext';

import {
  HomeContainer,
  DeiveryWrapper,
  AllProducts,
  BetweenGray,
  WhatsappContainer
} from './styles'

export const Home = () => {

  const { width } = useWindowSize();
  const [categories] = useCategory();
  const [configState] = useConfig()
  const [catId, setCatId] = useState(null);
  const [scrolledCatId, setscrolledCatId] = useState(1);

  const handleChangeCat = (catId) => {
    setCatId(catId);
    if (catId === null) {
      document.getElementById('rightContainer').classList.remove("spec-category")
      return
    }
    document.getElementById('rightContainer').classList.add("spec-category");
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
      <Header setCatId={setCatId} />
      <DeiveryWrapper>
        <Delivery />
      </DeiveryWrapper>
      <BetweenGray />
      {!catId && (
        <Category handleChangeCat={handleChangeCat} catId={catId} scrolledCatId={scrolledCatId} />
      )}
      {catId && (
        <AllProducts>
          <Products catId={catId} handleChangeCat={handleChangeCat} />
        </AllProducts>
      )}
      <ReiviewCart />
      <WhatsappContainer href={configState?.configs?.whatsAppUrl} target="_blank" rel="noreferrer">
        <AiOutlineWhatsApp color="white" size="30" />
      </WhatsappContainer>
    </HomeContainer>
  )
}
