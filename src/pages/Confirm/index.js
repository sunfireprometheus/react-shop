import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { Confirm as ConfirmController } from '../../components/Confirm'

export const Confirm = (props) => {
  return (
    <>
      <HelmetTags page='confirm' />
      <ConfirmController {...props} />
    </>
  )
}
