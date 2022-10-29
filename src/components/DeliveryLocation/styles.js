import styled from 'styled-components'

export const LocationContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
`

export const LocationName = styled.div`
    display: flex;
    align-items: center;
    span{
        margin: 0px 8px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        span {
            white-space: initial;
            line-height: 1.1;
        }
    }   
`

export const DeliverVal = styled.span`
    color:#bf7b00;
`