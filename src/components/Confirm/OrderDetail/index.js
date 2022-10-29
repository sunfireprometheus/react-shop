import React from 'react'
import { useTranslation } from 'react-i18next';

import {
  DetailRow,
  DetailTitle,
  DetailVal,
  PartTitle
} from '../styles'

import {
  OrderDetailContainer
} from './styles'

export const OrderDetail = (props) => {

  const { t } = useTranslation();
  const { paymentStatus } = props

  return (
    <OrderDetailContainer>
      <PartTitle>
        {t('Payment Detail')}
      </PartTitle>

      {/* <DetailRow>
        <DetailTitle>
          {t('Order number')}:
        </DetailTitle>
        <DetailVal>
          {paymentStatus?.variable1}
        </DetailVal>
      </DetailRow> */}

      {paymentStatus && paymentStatus?.method !== 0 && (
        <>
          <DetailRow>
            <DetailTitle>
              {t('Payment Id')}:
            </DetailTitle>
            <DetailVal>
              {paymentStatus?.paymentId}
            </DetailVal>
          </DetailRow>
          <DetailRow>
            <DetailTitle>
              {t('Reverence ID')}:
            </DetailTitle>
            <DetailVal>
              {paymentStatus?.orderReferenceNumber}
            </DetailVal>
          </DetailRow>
        </>
      )}
    </OrderDetailContainer>
  )
}