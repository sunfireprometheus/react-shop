import React, { createContext, useContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const addToCart = (prodId, prodPrice) => {
    let newArr = [];
    if (cart.find(item => item.prodId === prodId)) {
      newArr = cart.map(obj => {
        return obj.prodId === prodId
          ? { prodId: obj.prodId, price: prodPrice, count: obj.count + 1 }
          : obj
      })
    } else {
      newArr = [...cart, { prodId: prodId, count: 1, price: prodPrice }];
    }
    localStorage.setItem('cart', JSON.stringify(newArr));
    setCart(newArr);
  }

  const removeProd = (prodId) => {
    const newArr = cart.filter(obj => obj.prodId !== prodId);
    localStorage.setItem('cart', JSON.stringify(newArr));
    setCart(newArr);
  }

  const decreaseItem = (prodId) => {
    let newArr = [];
    newArr = cart.map(obj => {
      return obj.prodId === prodId
        ? { prodId: obj.prodId, price: obj.price, count: obj.count - 1 }
        : obj
    })
    localStorage.setItem('cart', JSON.stringify(newArr));
    setCart(newArr);
  }

  const addMultiProd = (id, count, prodPrice) => {
    let newArr = [];
    if (cart.find(item => item.prodId === id)) {
      newArr = cart.map(obj => {
        return obj.prodId === id
          ? { prodId: obj.prodId, price: prodPrice, count: obj.count + count }
          : obj
      })
    } else {
      newArr = [...cart, { prodId: id, price: prodPrice, count: count }];
    }
    localStorage.setItem('cart', JSON.stringify(newArr));
    setCart(newArr);
  }

  const initCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  }

  const functions = {
    addToCart,
    removeProd,
    decreaseItem,
    initCart,
    addMultiProd
  }

  return (
    <CartContext.Provider value={[cart, functions]}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const cartManager = useContext(CartContext)
  return cartManager || [{}, () => { }]
}