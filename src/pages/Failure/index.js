import React from 'react'
import { HelmetTags } from '../../components/HelmetTags'
import { Failure as FailureController } from '../../components/Failure'

export const Failure = (props) => {
  return (
    <>
      <HelmetTags page='failure' />
      <FailureController {...props} />
    </>
  )
}
