import styled, { css } from 'styled-components'

export const UnitTypeContainer = styled.div`
  padding: 0px 15px;
  margin-bottom: 10px;
`

export const UnitTypeHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`

export const UnitTypeMain = styled.div`
  display: flex;
  justify-content: space-around;
`

export const UnitTypeItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: space-between;
  ${({ width }) => width ? css`width: ${width};` : css`width : 32%;`}
  align-items: center;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 5px;

  ${({ active }) => active && css`
    padding: 9px;
    border: 2px solid #daa777;
  `}

  svg{
    margin-bottom: 10px;
  }

  &:hover{
    padding: 9px;
    border: 2px solid #daa777;
  }
`
