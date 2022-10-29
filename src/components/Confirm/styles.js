import styled from 'styled-components'

export const ConfirmContainer = styled.div`
  background-color: #f5f5f5;
  position: relative;
  width: 33.33%;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 990px) {
    width: 100%;
    height: inherit;
  }
`
export const MainContent = styled.div`
  max-height: calc(100vh - 155px);
  overflow-y: auto;
`

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
`

export const DetailTitle = styled.div`
  font-weight: bold;
  margin: 0px 10px;
`
export const DetailVal = styled.div`
`
export const PartTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`