import styled from 'styled-components'

export const SearchContainerStyled = styled.div`
    display: flex;
    align-items: center;
    background-color: #EEEEEE;
    padding: 10px 15px;
    & input {
        border: none;
        background-color: transparent;
        margin: 0px 10px;
        width: 100%;
        outline-width: 0;
        font-size: 16px;
        font-family: 'Cairo',sans-serif;
    }
`

export const SearchContainer = (props) => {
    return (
        <SearchContainerStyled>
            {props.children}
        </SearchContainerStyled>
    )
}