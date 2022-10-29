import styled, { css } from 'styled-components'

export const MessageWraper = styled.div`
  padding: 10px 15px;
  background-color: white;
  margin-bottom: 10px;
`

export const ResultMessageContainer = styled.div`
  text-align: center;
  padding: 10px 15px;
  border-radius: 5px;
  align-items: center;
  ${({ res }) => res
    ? css`color: green;`
    : css`color: red;`
  }
  svg{
    width: 60px;
    height: 60px;
    ${theme => theme.rtl ? css`margin-left: 10px;` : css`margin-right: 10px;`}
  }
`

export const Between = styled.div`
  margin-bottom: 20px;
`