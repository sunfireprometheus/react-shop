import React from 'react'
import styled from 'styled-components'

export const RightTopContainerStyled = styled.div`
  text-align: ${props => props.theme.rtl ? 'left' : 'right'};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.backgroundColor};
  padding: 25px 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & span{
    cursor: pointer;
    font-weight: 600;
    &:hover{
      color: #ffc2a5;
    }
  }

  @media (max-width: 990px) {
    padding: 5px 7%;
    span{
      &:hover{
        color: white;
      }
    }
  }
`

export const SearchIconWrapper = styled.div`
  ${props => props.theme.rtl ? 'margin-left: 10px' : 'margin-right: 10px'};
  & > svg {
    cursor: pointer;
  }
`
export const RightTopContainer = (props) => {
  return (
    <RightTopContainerStyled>
      {props.children}
    </RightTopContainerStyled>
  )
}
