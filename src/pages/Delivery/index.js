import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { Delivery as DeliveryController } from '../../components/Delivery'

export const Delivery = (props) => {
  return (
    <>
      <HelmetTags page='delivery' />
      <DeliveryController {...props} />
    </>
  )
}
