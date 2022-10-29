import styled, { css } from 'styled-components'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  padding: 8px 14px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all .2s ease-in;
  ${({ color, theme }) => color && css`
    background-color: ${color === 'primary' ? theme?.colors.primaryButtCol : theme?.colors.gray};
    color: white;
    &:hover{
      opacity: 0.8;
    }
  `}

  ${({ outLine, theme }) => outLine && css`
    border: 1px solid ${theme?.colors.primaryButtCol};
  `}

  ${({ disabled }) => disabled && css`
    background-color: #bdbdbd !important;
    cursor: inherit;
    &:hover{
      background-color: #bdbdbd;
    }
  `}

  ${({ width }) => width && css`
    width: ${width};
  `}

  ${({ uppercase }) => uppercase && css`text-transform: uppercase;`}
`

export const OutlineBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  padding: 6px 12px;
  font-size: 15px;
  font-family: inherit;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all .2s ease-in;
  background-color: white;

  ${({ color }) => css`
    border: 1px solid ${color};
    color: ${color};
  `}

  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: inherit;
  `}

  ${({ width }) => width && css`
    width: ${width};
  `}
  
  ${({ uppercase }) => uppercase && css`text-transform: uppercase;`}
`