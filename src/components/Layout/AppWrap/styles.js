import React from 'react'
import styled from 'styled-components'

export const AppContainerStyled = styled.div`
    display: flex;

    @media (max-width: 990px) {
        flex-direction: column-reverse;
    }
`
export const AppContainer = (props) => {
    return (
        <AppContainerStyled>
            {props.children}
        </AppContainerStyled>
    )
}