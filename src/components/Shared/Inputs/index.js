import styled, { css } from 'styled-components'

export const CustomInput = styled.input`
  outline: none;

  ${({ bordered, theme, error }) => css`
    border: none;
    ${error ? `
        border-bottom: 1px solid ${theme.colors.error};
      ` : `
        border-bottom: 1px solid ${theme.colors.gray};
    `}
    ${bordered && (
      error ? `
        border: 1px solid ${theme.colors.error};
        border-radius: 5px; 
      ` : `
        border: 1px solid ${theme.colors.gray};
        border-radius: 5px;
      `
    )}
  `}

  ${({width}) => width && css`width: ${width};`}
  font-size: 14px;
  padding: 6px 10px;
  font-family: 'Cairo',sans-serif;
`
