import styled, {css} from 'styled-components'

export const OneEle = styled.div`
    padding: 10px 15px;
    border-bottom: 1px solid #e8e8e8;
`
export const StateContainer = styled.div`
`

export const StateItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 1px solid #d3d3d3;
    border-top: 1px solid #d3d3d3;
    cursor: pointer;
    font-weight: 600;
    background-color: #f5f9ff;
    svg{
        transition: 0.3s all;
    }
    ${({toggle}) => toggle && css`
        & svg{
            transform: rotate(180deg);
        }
        `
    }
    &:hover{
        background-color: #e5f4ff;
    }
`

export const CityContainer = styled.div`
`

export const LocationItem = styled.label`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #f7f7f7;
    }
`
