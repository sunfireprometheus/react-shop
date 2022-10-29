import React from 'react'
import { useTheme } from 'styled-components'
import { useConfig } from '../../../contexts/ConfigContext';

import {
  RightCenterContainer,
} from './styles'

export const RightCenter = () => {

  const theme = useTheme();
  const [configState] = useConfig()
  const currentLng = localStorage.getItem('i18nextLng');

  return (
    <RightCenterContainer>
      {!configState?.loading && <img src={configState?.configs.background_logo || theme.images.logo} alt="right logo" className="rightLogo" />}
      <h1>{currentLng === 'en' ? configState?.configs?.appEnName : configState?.configs?.appArName}</h1>
    </RightCenterContainer>
  )
}
