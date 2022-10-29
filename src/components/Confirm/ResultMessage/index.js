import React from 'react'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { Button } from '../../Shared/Buttons';

import {
  MessageWraper,
  ResultMessageContainer,
  Between
} from './styles'
export const ResultMessage = (props) => {

  const { res } = props;
  const history = useHistory();
  const {t} =useTranslation();

  const handleClickPrev = () => {
    history.push('/payment');
  }

  return (
    <MessageWraper>
      <ResultMessageContainer res={res}>
        {res ? <BsCheckCircle/> : <BsXCircle/> }
        <div>
          {res ? t('Success Message') : t('Payment process error')}
        </div>
      </ResultMessageContainer>
      {!res && 
        <>
          <Between/>
          <Button color="primary" width="100%" onClick={handleClickPrev}>
            {t('Try again')}
          </Button>
        </>
      }
    </MessageWraper>
  )
}