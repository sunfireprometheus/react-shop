import React from 'react'

import {
  CheckoutProgressContainer,
  ProgItem
} from './styles'
export const CheckoutProgress = (props) => {

  const { step } = props
  return (
    <CheckoutProgressContainer>
      {
        [...Array(4).keys()].map(index => (
          <ProgItem key={index} active={step  > index} />
        ))
      }
    </CheckoutProgressContainer>
  )
}