import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { Contact as ContactController } from '../../components/Contact'

export const Contact = (props) => {
  return (
    <>
      <HelmetTags page='contact' />
      <ContactController {...props} />
    </>
  )
}
