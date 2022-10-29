import React, { createContext, useContext, useEffect, useState } from 'react'
import ApiService from '../../service/ApiService';

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const res = await ApiService('/products', {}, 'get')
    setProducts(res?.data);
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductContext.Provider value={[products]}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  const productManager = useContext(ProductContext)
  return productManager || [{}]
}
