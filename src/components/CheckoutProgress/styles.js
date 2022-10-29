import styled from 'styled-components'

export const CheckoutProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ProgItem = styled.div`
  ${({ active, theme }) => `background-color: ${active ? theme.colors.progressBarActiveCol : theme.colors.progressBarDeactiveCol}`};
  width: 24%;
  padding:2px 0px;
`