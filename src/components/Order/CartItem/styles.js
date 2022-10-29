import styled from 'styled-components'

export const CartItemContainer = styled.div`
    padding: 5px 15px;
    border-bottom: 1px solid #e8e8e8;
`
export const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
    svg{
        cursor: pointer;
    }
`
export const ItemTitle = styled.div`
    font-weight: 600;
    color: #ff6921;
    cursor: pointer;
    &:hover{
        color: #cb0000;
    }
`
export const ItemPrice = styled.div`
    font-weight: 600;
`

export const ItemCountControll = styled.div`
    display: flex;
    align-items: center;
    ${props => props.theme.rtl && `flex-direction: row-reverse;`}
    svg{
        cursor: pointer;
    }
`

export const ItemCount = styled.div`
    width: 30px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const RemoveProductModalWrapper = styled.div`
    text-align: center;
    padding: 20px 20px 20px 20px;
`
export const ActionGroup = styled.div`
    display: flex;
    justify-content: center;
    > button {
        margin-right: 10px;
    }
`
export const RemoveIcon = styled.div`
`
export const RemoveText = styled.div`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
`