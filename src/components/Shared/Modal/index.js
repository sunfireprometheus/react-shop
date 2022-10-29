import React from 'react'
import { AiOutlineClose } from "react-icons/ai";

import { Popup } from './Popup'
import {
  ModalDialog,
  ModalTitle,
  ModalIcon,
  ModalHeader
} from './styles'

const ModalUI = (props) => {
  const {
    title,
    children,
    onClose,
    isTransparent,
    isHideCloseIcon
  } = props

  return (
    <ModalDialog
      className='popup-dialog'
      width={props.width}
      height={props.height}
      padding={props.padding}
      isTransparent={isTransparent}
    >
      {!isHideCloseIcon && (
        <ModalIcon>
          <AiOutlineClose onClick={() => onClose()} />
        </ModalIcon>
      )}
      <ModalHeader>
        {title && (
          <ModalTitle>
            {title}
          </ModalTitle>
        )}
      </ModalHeader>
      {children}
    </ModalDialog>
  )
}

export const Modal = (props) => {
  const ModalProps = {
    ...props,
    UIComponent: ModalUI
  }

  return (
    <Popup {...ModalProps} />
  )
}
