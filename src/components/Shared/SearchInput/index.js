import React from 'react'
import { BsSearch } from "react-icons/bs";

import { SearchContainer } from './styles'

export const SearchInput = (props) => {
    const { onChange } = props;
    return (
        <SearchContainer>
            <BsSearch />
            <input type="text" name="deleiverySearch" onChange={onChange}/>
        </SearchContainer>
    )
}