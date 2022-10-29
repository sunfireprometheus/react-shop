import React, { createContext, useContext, useState } from 'react'
import moment from "moment";
import "moment-timezone";

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const timeRange = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const currentHour = moment().tz("Asia/Kuwait").hour();
  const minTime = timeRange[0] - 1;
  const maxTime = timeRange[timeRange.length - 1] - 1;
  const isEnabledASAP = currentHour >= minTime && currentHour <= maxTime;
  const minDate = currentHour + 1 < maxTime ? moment().tz("Asia/Kuwait").format('YYYY/MM/DD') :
    moment().add(1, 'day').tz("Asia/Kuwait").format('YYYY/MM/DD');
  const savedOrderDetail = JSON.parse(localStorage.getItem('orderDetail'))

  const convertAmPm = (hour) => {
    return hour <= 11 ? hour + 'am' :
      hour === 12 ? hour + 'pm' : (hour - 12) + 'pm'
  }

  const initDeliveryTimeObj = {
    timeRange: timeRange,
    minTime: minTime,
    maxTime: maxTime,
    minDate: minDate,
    currentHour: currentHour,
    isEnabledASAP: isEnabledASAP,
    deiveryTime: {
      date: minDate,
      time: isEnabledASAP ? convertAmPm(currentHour + 1) : convertAmPm(minTime + 1)
    }
  }

  const [orderDetail, setOrderDetail] = useState(savedOrderDetail || initDeliveryTimeObj);

  const updateOrder = (changes) => {
    const newObj = {
      ...orderDetail,
      ...changes
    }
    localStorage.setItem('orderDetail', JSON.stringify(newObj));
    setOrderDetail(newObj)
  }

  const initOrder = () => {
    localStorage.setItem('orderDetail', JSON.stringify(initDeliveryTimeObj));
    setOrderDetail(initDeliveryTimeObj);
  }

  const functions = {
    updateOrder,
    initOrder
  }

  return (
    <OrderContext.Provider value={[orderDetail, functions]}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const orderManager = useContext(OrderContext)
  return orderManager || [{}, () => { }]
}
