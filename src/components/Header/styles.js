import React from 'react'
import styled from 'styled-components'

export const HeaderContainerStyled = styled.div`
  background-color: white;
  display: flex;
  padding: 10px 16px;
  align-items: center;
  & .leftLogo{
      width: 140px;
      margin-right: 10px;
      cursor: pointer;
  }
  & h5{
      margin: 0px 0px 5px 0px;
      font-size: 1.25em;
      padding: 0px 8px;
  }
  & .paymentImgs img{
      padding: 0px 4px;
      width: 50px;
  }
`
export const PaymentImgs = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const HeaderContainer = (props) => {
  return (
    <HeaderContainerStyled>
      {props.children}
    </HeaderContainerStyled>
  )
}
