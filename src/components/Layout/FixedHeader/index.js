import styled from 'styled-components'

export const FixedHeader = styled.div`
  background-color: white;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  svg{
    cursor: pointer;
  }
`

export const GobackTitle = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;

  > span {
    padding: 0 3px;
  }
`