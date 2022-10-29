import styled from 'styled-components'

export const CartDetailContainer = styled.div`
  margin-bottom: ${({ cashPay }) => `${cashPay ? '10px' : '20px'}`};
  padding: 10px 15px ${({ cashPay }) => `${cashPay ? '10px' : '20px'}`};
  border-bottom: 1px solid #e5e5e5;
  background-color: white;
`

export const CartCountTotal = styled.div`

`
export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`
export const TotalTotal = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  justify-content: space-between;
  align-items: center;
`
