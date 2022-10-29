import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsHouseDoor, BsReceiptCutoff, BsBriefcase } from "react-icons/bs";

import {
  UnitTypeContainer,
  UnitTypeHeader,
  UnitTypeMain,
  UnitTypeItem
} from './styles'

export const UnitType = (props) => {

  const {unitSelect, unitType} = props
  const {t} = useTranslation();

  return (
    <UnitTypeContainer>
      <UnitTypeHeader>
        {t('Choose Unit Type')}
      </UnitTypeHeader>
      <UnitTypeMain>
        <UnitTypeItem active={unitType==='house'} onClick={()=>unitSelect('house')}>
          <BsHouseDoor size={24}/>
          {t('House')}
        </UnitTypeItem>
        <UnitTypeItem active={unitType==='apartment'} onClick={()=>unitSelect('apartment')}>
          <BsReceiptCutoff size={24}/>
          {t('Apartment')}
        </UnitTypeItem>
        <UnitTypeItem active={unitType==='office'} onClick={()=>unitSelect('office')}>
          <BsBriefcase size={24}/>
          {t('Office')}
        </UnitTypeItem>
      </UnitTypeMain>
    </UnitTypeContainer>
  )
}
