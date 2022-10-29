import React from 'react'
import styled from 'styled-components'

export const RightCenterContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  flex: 1;
  & .rightLogo {
    width: 140px;
    margin-right: 10px;
    border-radius: 10%;
    cursor: pointer;
  }
  & h1{
    font-weight: 500;
    line-height: 1.2;
    font-size: 36px;
    color: #fff;
    margin-top: 0;
  }
  @media (max-width: 990px) {
    display: none;
  }
`

export const RightCenterContainer = (props) => {
  return (
    <RightCenterContainerStyled>
      {props.children}
    </RightCenterContainerStyled>
  )
}
