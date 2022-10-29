import styled from 'styled-components'

export const ProdModalHeader = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    width: 100%;
    padding: 10px 15px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), transparent);
`
export const CloseModal = styled.div`
    cursor: pointer;
`
export const ProdMain = styled.div`
    background-color: #f5f5f9;
    height: calc(100vh - 65px);
    padding-bottom: 20px;
    overflow-y: auto;
`

export const ProdImg = styled.img`
    width: 100%;
    min-height: 256px;
    height: 100%;
    max-height: 512px;
    flex-shrink: 0;
    object-fit: fill;
    @media (max-width: 990px) {
        max-height: 350px;
    }
`
export const ProdDetail = styled.div`
    background-color: white;
    padding: 12px 16px;
    margin-bottom: 10px;
`
export const ProdTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
`
export const ProdDes = styled.div`
    font-size: 14px;
`
export const ProdPrice = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 10px 16px;
    margin-bottom: 10px;
`

export const ProdToCart = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    background-color: white;
    svg{
        margin: 0px 10px;
        ${({ noQty }) => `cursor: ${noQty ? 'not-allowed' : 'pointer'}`}
    }
`