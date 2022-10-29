import React from 'react'
import { useHistory } from 'react-router-dom';

import { useOrder } from '../../../contexts/OrderContext';
import { HouseForm } from './HouseForm';
import { ApartmentForm } from './ApartmentForm';
import { OfficeForm } from './OfficeForm';

import {
  FormsWraperContainer
} from './styles'

export const FormsWraper = (props) => {
  const history = useHistory();
  const {unitType} = props
  const [, {updateOrder}] = useOrder();

  const updateOrderDetail = (data) => {
    const changes = { 
      unitType: unitType,
      address: data 
    }
    updateOrder(changes);
    history.push('/payment');
  }

  return (
    <FormsWraperContainer>
      {unitType === 'house' && <HouseForm updateOrderDetail={updateOrderDetail}/>}      
      {unitType === 'apartment' && <ApartmentForm updateOrderDetail={updateOrderDetail} />}      
      {unitType === 'office' && <OfficeForm updateOrderDetail={updateOrderDetail} />}      
    </FormsWraperContainer>
  )
}