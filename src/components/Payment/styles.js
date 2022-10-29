import styled from 'styled-components'

export const PaymentContainer = styled.div`
  background-color: white;
  position: relative;
  width: 33.33%;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 990px) {
    width: 100%;
    height: inherit;
  }
`