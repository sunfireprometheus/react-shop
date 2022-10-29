import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { Payment as PaymentController } from '../../components/Payment'

export const Payment = (props) => {
  return (
    <>
      <HelmetTags page='payment' />
      <PaymentController {...props} />
    </>
  )
}
