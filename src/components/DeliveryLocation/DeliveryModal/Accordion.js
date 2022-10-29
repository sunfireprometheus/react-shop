import React, {useState} from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import {
  StateContainer,
  StateItem,
  CityContainer,
  LocationItem
} from './styles'

export const Accordion = (props) => {
  const { 
    title, 
    found, 
    selectedCity,
    handleSubmit
  } = props

  const currentLng = localStorage.getItem('i18nextLng');
  const [isActive, setIsActive] = useState(true);

  const handleClickTitle = () => {
    setIsActive(!isActive);
  }

  return (
    <StateContainer>
      <StateItem onClick={handleClickTitle}>
        {title}
        {isActive ? <FiChevronDown size={25} /> : <FiChevronUp size={25} /> }
      </StateItem>
      {
        isActive && 
          <CityContainer>
            {found?.map((city) =>
              <LocationItem key={city.id} htmlFor={city.id} onClick={() => handleSubmit(city.id)}>
                {currentLng === 'en' ? city.name_en : city.name_ar}
                <input type="radio"
                  name='location'
                  id={city.id}
                  onChange={() => handleSubmit(city.id)}
                  checked={selectedCity === city.id}
                />
              </LocationItem>
            )}
          </CityContainer>
      }
    </StateContainer>
  )
}