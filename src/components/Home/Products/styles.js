import styled, { css } from 'styled-components'

export const ProductContainerStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`
export const ProductMain = styled.div`
    min-height: 300px;
`

export const ProductItem = styled.div`
    ${({ isAdded }) => isAdded && css`
        ${props => props.theme.rtl
            ? css`border-right: 6px solid ${props.theme.colors.primaryButtCol};`
            : css`border-left: 6px solid ${props.theme.colors.primaryButtCol};`
        }
    `}
    box-sizing: border-box;
    background-color: white;
    padding: 15px 15px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ProductCount = styled.span`
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.primaryIconCol};
`

export const ProductDetail = styled.div`
    flex: 1;
    margin: 0px 5px;
`
export const ProductImgWrapper = styled.div`
    position: relative;
    width: 92px;
    height: 92px;
    margin: 0px 5px;
`
export const ProductImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 4px;
`

export const ProductTitle = styled.div`
    cursor: pointer;
    font-weight: 700;
    color: #ff6921;
    &:hover{
        color: #cb0000;
    }
`

export const ProductDescription = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
`

export const ProductPirceAndCartBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg{
        cursor: pointer;
    }
`
export const ProductPrice = styled.div`
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    svg{
        margin: 0px 10px;
        ${({ noQty }) => noQty ? 'cursor: not-allowed;' : 'cursor: pointer;'}
    }
`
export const ClosedMessageBack = styled.div`
    position: absolute;
    border-radius: 4px;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.closedProductCol};
`
export const ClosedMessage = styled.span`
    color: ${({ theme }) => theme.colors.backgroundColor};
`

export const ProductContainer = (props) => {
    return (
        <ProductContainerStyled id={props.id}>
            {props.children}
        </ProductContainerStyled>
    )
}