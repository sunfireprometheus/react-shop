import styled, { css } from 'styled-components'

export const ModalContainer = styled.div`
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100vh;
    top: 0px;
    left: 0px;
    z-index: 1000;
`

export const ModalDialog = styled.div`
    position: relative;
    width: 33.33%;
    height: 100vh;
    background-color: white;

    @media (max-width: 990px) {
        width: 400px;
        max-width: 100%;
    }
`

export const ModalHeader = styled.div`
    position: relative;
    padding: 15px 15px;
    border-bottom: 1px solid #e8e8e8;
`

export const ModalTItle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
`

export const ModalClose = styled.div`
    position: absolute;
    top: 10px;
    ${props => props.theme.rtl
        ? css`right: 15px;`
        : css`left: 15px;`
    }
    padding: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s all;
    &:hover{
        background-color: #f5f5f5;
    }
`

export const ModalBody = styled.div`
    padding: 5px 15px 10px;
    overflow: auto;
    ${({ noFooter }) => noFooter
        ? css`max-height: calc(100vh - 80px);`
        : css`max-height: calc(100vh - 120px);`
    }
`

export const ModalFooter = styled.div`
    max-width: 100%;
    background-color: white;
    position: fixed;
    width: inherit;
    bottom: 0px;
    padding: 10px 15px;
`
