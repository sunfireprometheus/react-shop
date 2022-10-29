import styled from 'styled-components'

export const FieldRow = styled.div`
  text-align: center;
  margin-bottom: 20px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`
export const TitleAndError = styled.div`
  display: flex;
  align-items: center;
`
export const FormTItle = styled.div`
  font-size: 12px;
`
export const FormError = styled.div`
  color: red;
  font-size: 12px;
  margin: 0px 10px;
`
