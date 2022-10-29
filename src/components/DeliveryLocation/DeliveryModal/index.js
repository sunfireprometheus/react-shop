import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { useAddress } from '../../../contexts/AddressContext'
import { useOrder } from '../../../contexts/OrderContext'
import { SearchInput } from '../../Shared/SearchInput'
import { Accordion } from './Accordion'

import {
  ModalContainer,
  ModalDialog,
  ModalBody
} from '../../Shared/SideModal'
import { FixedHeader, GobackTitle } from '../../Layout/FixedHeader'
import {
  OneEle
} from './styles'

export const DeliveryModal = (props) => {

  const currentLng = localStorage.getItem('i18nextLng');
  const { closeHandleClick } = props
  const { t } = useTranslation();
  const [orderDetail, { updateOrder }] = useOrder();
  const [states, cities] = useAddress();

  const [searchedCities, setSearchedCities] = useState(cities)
  const selectedCity = parseInt(orderDetail.currentLocation)

  const searchChange = (e) => {
    const searchText = e.target.value;
    const newArr = currentLng === 'en'
      ? cities.filter(item => item.name_en.toUpperCase().includes(searchText.toUpperCase()))
      : cities.filter(item => item.name_ar.toUpperCase().includes(searchText.toUpperCase()))
    setSearchedCities(newArr);
  }

  const handleSubmit = (stateId, cityId) => {
    updateOrder({
      currentState: stateId,
      currentLocation: cityId
    });
    closeHandleClick();
  }

  return (
    <ModalContainer>
      <ModalDialog>
        <FixedHeader>
          {currentLng === 'en'
            ? <FiArrowLeft size="20" onClick={closeHandleClick} />
            : <FiArrowRight size="20" onClick={closeHandleClick} />
          }
          <GobackTitle>{t('Delivery Time')}</GobackTitle>
        </FixedHeader>
        <ModalBody noFooter={true}>
          <OneEle>
            <SearchInput onChange={searchChange} />
          </OneEle>

          {states?.length > 0 &&
            states.map(item => {
              const found = searchedCities.filter(obj => obj.state_id === item.id);
              return (
                found?.length > 0 &&
                <Accordion
                  key={item.id}
                  title={currentLng === 'en' ? item.name_en : item.name_ar}
                  found={found}
                  selectedCity={selectedCity}
                  handleSubmit={(_id) => handleSubmit(item?.id, _id)}
                />
              )
            })}
        </ModalBody>
      </ModalDialog>
    </ModalContainer>
  )
}