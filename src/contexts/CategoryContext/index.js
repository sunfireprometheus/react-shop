import React, { createContext, useContext, useEffect, useState } from 'react'
import ApiService from '../../service/ApiService';

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    const endpoint = '/categories'
    const res = await ApiService(endpoint, {}, 'get');
    setCategories(res.data);
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <CategoryContext.Provider value={[categories]}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  const categoryManager = useContext(CategoryContext)
  return categoryManager || [{}]
}
