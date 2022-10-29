import styled from 'styled-components'

export const CartDetailContainer = styled.div`
  margin-bottom: 10px;
  padding: 10px 15px;
  border-bottom: 1px solid #e5e5e5;
  background-color: white;
`

export const CartContainer = styled.div`
  margin-bottom: 10px;
`

export const ProdItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  border-bottom: 1px solid #e9e4e4;
`
export const ProdTitleAndCount = styled.div`
  font-weight: bold;
  align-items: center;
  margin: 0px 10px;
`
export const ProdTitle = styled.div`
    color: #ff6921;
    cursor: pointer;
`
export const ProdCount = styled.div`
  display: flex;
  align-items: center;
  color: #007eff;
`

export const ProdImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`
