import { t } from 'i18next';
import React from 'react'
import { useTranslation } from "react-i18next";

import { useConfig } from '../../../contexts/ConfigContext';
import { useCategory } from '../../../contexts/CategoryContext'
import { useProduct } from '../../../contexts/ProductContext'

import {
  CategoryContainer,
  CategoryTitle,
  CategoriesWrapper,
  CategoryItem,
  CategoryImgWrapper,
  CategoryImg,
  CategoryName
} from './styles'

export const Category = (props) => {

  useTranslation();
  const { handleChangeCat, catId, scrolledCatId } = props
  const currentLng = localStorage.getItem('i18nextLng');
  const [configState] = useConfig()
  const [categories] = useCategory();
  const [products] = useProduct();

  return (
    <CategoryContainer>
      <CategoryTitle>{t('Vendors')}</CategoryTitle>
      <CategoriesWrapper viewType={configState?.configs?.categoryTypeView}>
        {categories.filter(category => products.some(product => product?.cat_id === category.id))
          .map(item => (
            <CategoryItem
              key={item.id}
              onClick={() => handleChangeCat(item.id)}
              active={(!catId && scrolledCatId === item.id) || (catId === item.id)}
              viewType={configState?.configs?.categoryTypeView}
            >
              <CategoryImgWrapper>
                <CategoryImg src={item.image} />
              </CategoryImgWrapper>
              <CategoryName>{currentLng === 'en' ? item.name_en : item.name_ar}</CategoryName>
            </CategoryItem>
          ))}
      </CategoriesWrapper>
    </CategoryContainer>
  )
}