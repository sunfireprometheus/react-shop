import React, { useEffect } from 'react'
import { useTranslation } from "react-i18next";
import { BsSearch } from "react-icons/bs";
import { useTheme } from '../../../contexts/ThemeContext'

import {
  RightTopContainer
} from './styles'

export const RightTop = () => {

  const [theme, { update }] = useTheme()
  const { i18n } = useTranslation();
  const currentLng = localStorage.getItem('i18nextLng');

  useEffect(() => {
    if (currentLng === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }, [currentLng]);

  const changeLanguage = () => {
    if (currentLng === 'ar') {
      i18n.changeLanguage("en")
      update({ ...theme, rtl: false });
    } else {
      i18n.changeLanguage("ar")
      update({ ...theme, rtl: true });
    }
  }

  return (
    <RightTopContainer>
      <div>
        <BsSearch />
      </div>
      {currentLng === 'en'
        ? <span onClick={changeLanguage}>عربي</span>
        : <span onClick={changeLanguage}>English</span>
      }
    </RightTopContainer>
  )
}
