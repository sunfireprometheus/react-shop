import styled, { css } from 'styled-components';

export const MainContainer = styled.div`
    text-align: center;
`

export const DateTimeContainer = styled.div`
    display: inline-block;
    max-width: 100%;
    width: 100%;
    overflow: auto;
    .hourTitle{
        font-size: 16px;
    }
`

export const CalendarContainer = styled.div`
    margin-bottom: 20px;
    > .react-calendar {
        width: 100%;
    }
`
export const RadioGroup = styled.div`
    text-align: left;
    padding-left: 10px;
`
export const Radio = styled.div`
    border-bottom: 1px solid ${props => props.theme?.colors.gray};
    padding: 5px 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    ${({ disabled }) => disabled && css`
        cursor: not-allowed;
        opacity: 0.4;
    `}

    > span {
        font-size: 18px;
    }
    > svg {
        ${({ theme, direction }) => theme.rtl && direction === 'rtl'
        ? css`margin-left: 10px;`
        : css`margin-right: 10px;`
    }
    }
`
export const ScheduleOption = styled.div`
`
export const ScheduleOrder = styled.div`
    margin-bottom: 5px;
`
