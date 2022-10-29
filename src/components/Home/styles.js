import React from 'react'
import styled from 'styled-components'

export const HomeContainerStyled = styled.div`
  background-color: #EDECEE;
  position: relative;
  width: 33.33%;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 990px) {
    width: 100%;
    height: inherit;
    overflow: unset;
  }
`

export const DeiveryWrapper = styled.div`
  background-color: white;
  border-top: 1px solid rgba(0,0,0,0.2);
  padding: 10px 16px;
`

export const BetweenGray = styled.div`
  padding: 7px;
`

export const AllProducts = styled.div`
  ${({ isNotProductSearched }) => isNotProductSearched && `
    position: absolute;
  `}
  top: 0;
  width: 100%;
  margin-bottom: 80px;
`

export const WhatsappContainer = styled.a`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #24b724;
  z-index: 100;
  position: fixed;
  bottom: 20px;
  cursor: pointer;
  ${props => props.theme.rtl ? `left: 20px;` : `right: 20px;`}

  @media (max-width: 990px) {
    bottom: 65px;
  }
`
export const ProductSearchWrapper = styled.div`
`
export const OneEle = styled.div`
    padding: 10px 15px;
    border-bottom: 1px solid #e8e8e8;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`
export const HomeContainer = (props) => {
  return (
    <HomeContainerStyled id={props.id}>
      {props.children}
    </HomeContainerStyled>
  )
}

