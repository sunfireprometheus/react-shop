import React from 'react'
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { FixedHeader, GobackTitle } from '../Layout/FixedHeader';
import { MainContent } from '../Layout/MainContent';
import { FixedFooter } from '../Layout/FixedFooter';
import { Button } from '../Shared/Buttons'
import { CheckoutProgress } from '../CheckoutProgress';
import { ContactContent } from './ContactContent'

import {
  ContactContainer
} from './styles';

export const Contact = () => {

  const currentLng = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }

  return (
    <ContactContainer>
      <FixedHeader>
        {currentLng === 'en' 
          ? <FiArrowLeft size="20" onClick={goBack}/>
          : <FiArrowRight size="20" onClick={goBack}/>
        }
        <GobackTitle>{t('Checkout')}</GobackTitle>
      </FixedHeader>
      <CheckoutProgress step={1}/>
      <MainContent>
        <ContactContent />
      </MainContent>
      <FixedFooter>
        <Button color="primary" width="100%" type="submit" form="contactForm">
          {t('Next')}
        </Button>
      </FixedFooter>
    </ContactContainer>
  )
}
