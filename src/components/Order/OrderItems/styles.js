import styled from 'styled-components'

export const OrderItemsContainer = styled.div`
    background-color: white;
    margin: 10px 0px;
`

export const ItemsHeader = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding: 10px 15px;
    border-bottom: 1px solid #e8e8e8;
`
export const NoOrdered = styled.div`
`
export const EmptyCartMessage = styled.div`
    padding: 10px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`
export const EmptyImgWrapper = styled.div`
    width: 320px;
    margin: auto;
    padding: 2.5% 5% 2.5%;

    @media (max-width: 320px) {
        width: 100%;
    }
`
export const EmptyImg = styled.img`
    width: 100%;
`
export const AddItemMessage = styled.div`
    padding: 5px 20px 50px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`
