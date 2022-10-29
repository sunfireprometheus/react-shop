import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { Order as OrderController } from '../../components/Order'

export const Order = (props) => {
  return (
    <>
      <HelmetTags page='order' />
      <OrderController {...props} />
    </>
  )
}
