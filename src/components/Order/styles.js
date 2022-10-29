import React from 'react'
import styled from 'styled-components'

export const OrderContainerStyled = styled.div`
  background-color: #EDECEE;
  position: relative;
  width: 33.33%;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 990px) {
    width: 100%;
    height: inherit;
  }
`
export const DeiveryWrapper = styled.div`
  margin-top: 10px;
  background-color: white;
  padding: 10px 16px;
`

export const GoCheckOut = styled.div`
  background-color: white;
  padding: 10px 15px;
  position: fixed;
  width: fit-content;
  bottom: 0px;
`

export const OrderContainer = (props) => {
  return (
    <OrderContainerStyled>
      {props.children}
    </OrderContainerStyled>
  )
}

export const OrderErrorModalWrapper = styled.div`
    text-align: center;
    padding: 20px 20px 20px 20px;
`
export const ActionGroup = styled.div`
    display: flex;
    justify-content: center;
    > button {
        margin-right: 10px;
    }
`
export const ErrorText = styled.div`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
`