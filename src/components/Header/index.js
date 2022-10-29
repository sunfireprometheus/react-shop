import React from 'react'
import { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useConfig } from '../../contexts/ConfigContext';
import {
  HeaderContainer,
  PaymentImgs
} from './styles'

export const Header = (props) => {

  const { setCatId } = props
  const [configState] = useConfig()
  const history = useHistory();
  const theme = useTheme();
  const currentLng = localStorage.getItem('i18nextLng');

  const handleClickLogo = () => {
    setCatId(null);
    history.push('/');
  }

  return (
    <HeaderContainer>
      {!configState?.loading && <img src={configState?.configs.logo || theme.images.logo} alt="logo" className="leftLogo" onClick={handleClickLogo} />}
      <div>
        <h5>{currentLng === 'en' ? configState?.configs?.appEnName : configState?.configs?.appArName}</h5>
        <PaymentImgs className="paymentImgs">
          {configState?.configs?.Payment0 === "1" && <img src={theme.images.payment.cash} alt='cash' />}
          {configState?.configs?.Payment1 === "1" && <img src={theme.images.payment.knet} alt='Knet' />}
          {configState?.configs?.Payment2 === "1" && <img src={theme.images.payment.visa} alt='visa' />}
          {configState?.configs?.Payment2 === "1" && <img src={theme.images.payment.master} alt='master' />}
        </PaymentImgs>
      </div>
    </HeaderContainer>
  )
}
