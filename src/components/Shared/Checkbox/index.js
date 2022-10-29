import styled from 'styled-components'

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  cursor: pointer;
  width: 22px;
  height: 22px;
  border: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: 0.3s all;

  &:hover:before {
    border: 2px solid #daa777;
    transition: 0.1s all;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 22px;
    height: 22px;
    top: 0;
    left: 0;
    border: 2px solid grey;
    border-radius: 4px;
    background: white;
    transition: 0.1s all;
  }

  &:checked:before {
    content: "";
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 0;
    background-color: #daa777;
    border: none;
    transition: 0.1s all;
  }
  &:checked:after {
    content: "";
    display: block;
    width: 5px;
    height: 12px;
    border: solid Black;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 4px;
    left: 9px;
    transition: 0.1s all;
  }
`

