import styled from 'styled-components'

export const ReiviewCartContainerStyled = styled.div`
    position: fixed;
    bottom: 0px;
    background-color: white;
    padding: 10px 15px;
    border-top: 0.55px solid rgba(0,0,0,0.1);
    width: inherit;
`

export const ReviewCart = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

export const CountPrice = styled.div`
    display: flex;
    align-items: center;
`

export const ReveiwCount = styled.span`
    width: 27px;
    height: 27px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
    color: #5586df;
`

export const ReiviewCartContainer = (props) => {
    return (
        <ReiviewCartContainerStyled>
            {props.children}
        </ReiviewCartContainerStyled>
    )
}