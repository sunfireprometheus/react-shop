import React from 'react'
// import { useTheme } from 'styled-components'
import { RightTop } from './RightTop'
import { RightCenter } from './RightCenter'
import { useConfig } from '../../contexts/ConfigContext';

import {
  RightContainer,
  RightWrapper
} from './styles'

export const RightMain = () => {

  const [configState] = useConfig()
  // const theme = useTheme();

  return (
    <RightContainer bgimage={configState?.configs?.background_image} id="rightContainer">
      <RightWrapper>
        <RightTop />
        <RightCenter />
      </RightWrapper>
    </RightContainer>
  )
}
