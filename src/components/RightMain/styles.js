import styled, { css } from 'styled-components'

export const RightContainer = styled.div`
  width: 66.66%;
  height: 100vh;
  display: block;

  ${({ bgimage }) => bgimage && css`
    background-image: url(${bgimage});
    background-repeat: no-repeat, repeat;
    background-size: cover;
    object-fit: cover;
    background-position: center;
  `}

  @media (max-width: 990px) {
    width: 100%;
    &.spec-category {
      display: none;
    }
  }

  @media (max-width: 600px) {
    height: 260px;
  }
`

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  @media (max-width: 990px) {
    background-color: rgba(0,0,0,0);
  }
`
