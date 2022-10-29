import styled from 'styled-components'

export const CustomLink = styled.a`
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    ${({ size }) => size && `font-size : ${size}px;`} 
`