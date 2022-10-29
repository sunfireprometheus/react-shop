import styled from 'styled-components'

export const Wrapper = styled.div`
    position: absolute;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.loadingBackCol};

`