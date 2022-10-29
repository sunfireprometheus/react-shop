import React, { createContext, useContext, useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'

export const AddressContext = createContext()

export const AddressProvider = ({ children }) => {
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])


  const getCities = async () => {
    const res = await ApiService('/cities', {}, 'get');
    setCities(res?.data);
  }

  const getStates = async () => {
    const res = await ApiService('/states', {}, 'get');
    setStates(res?.data);
  }

  useEffect(() => {
    getCities()
    getStates();
  }, [])

  return (
    <AddressContext.Provider value={[states, cities]}>
      {children}
    </AddressContext.Provider>
  )
}

export const useAddress = () => {
  const addressManager = useContext(AddressContext)
  return addressManager || [{}, {}]
}
