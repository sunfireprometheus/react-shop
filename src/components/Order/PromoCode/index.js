import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useOrder } from '../../../contexts/OrderContext'
import ApiService from '../../../service/ApiService'
import { OutlineBtn } from '../../Shared/Buttons'
import {
  PromoCodeContainer,
  PromoHeader,
  CodeContainer,
  CodeInput,
  ErrorMsg
} from './styles'

export const PromoCode = () => {
  const { t } = useTranslation();
  const [, { updateOrder }] = useOrder();
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setCode(e.target.value);
  }

  const handleClickApply = async () => {

    //-------------- sending api with code  ----------------
    const endpoint = '/coupons/'
    try {
      const response = await ApiService(endpoint + code, {}, 'GET')
      if (response?.success === '1') {
        updateOrder({
          coupon: {
            couponId: response?.data[0].id,
            couponName: response?.data[0].code,
            couponType: response?.data[0].type,
            couponAmount: response?.data[0].value
          }
        });
        setIsError(false);
        return
      }
      updateOrder({ coupon: null });
      setIsError(true);
    } catch (err) {
      console.log(err, 'coupon code error')
      updateOrder({ coupon: null });
      setIsError(true);
    }
  }

  return (
    <PromoCodeContainer>
      <PromoHeader>
        {t('Promo Code')}
      </PromoHeader>
      <CodeContainer>
        <CodeInput type='text' placeholder={t('Enter discount code')} value={code} onChange={handleChange} />
        <OutlineBtn color="#bb6600" disabled={!code} onClick={handleClickApply}>
          {t('Apply')}
        </OutlineBtn>
      </CodeContainer>
      <ErrorMsg active={isError}> Promo Code is not correct! </ErrorMsg>
    </PromoCodeContainer>
  )
}