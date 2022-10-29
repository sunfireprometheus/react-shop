import styled, { css } from 'styled-components'

export const CustomSelect = styled.select`
  border: none;
  outline: none;
  ${({error}) => error 
    ? css`border-bottom: 1px solid red;`
    : css`border-bottom: 1px solid #dfdfdf;`
  }
  ${({width}) => width && css`width: ${width};`}
  font-size: 15px;
  padding: 6px 10px;
  font-family: 'Cairo',sans-serif;
`
