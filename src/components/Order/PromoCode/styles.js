import styled, { css } from 'styled-components'

export const PromoCodeContainer = styled.div`
  background-color: white;
  padding: 15px 15px;
  margin-bottom: 10px;
`

export const PromoHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`

export const CodeContainer = styled.div`
  display: flex;
`

export const CodeInput = styled.input`
  flex: 1;
  font-size: 16px;
  font-family: 'Cairo',sans-serif;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  outline: none;
  ${props => props.theme.rtl ? `margin-left: 20px;` : `margin-right: 20px;`}
`

export const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  ${({ active }) => active ? css`display: block;` : css`display: none;`}
`

