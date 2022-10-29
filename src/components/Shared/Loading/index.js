import React from 'react'
import ReactLoading from 'react-loading';
import { useTheme } from '../../../contexts/ThemeContext'
import { Wrapper } from './styles';

export const Loading = (props) => {
    const { color, type } = props
    const [theme] = useTheme()

    return (
        <Wrapper>
            <ReactLoading type={type || 'bubbles'} color={color || theme.colors.green} height={'150px'} width={'150px'} />
        </Wrapper>
    )
}

