import React, { useContext, useState, createContext, useEffect } from 'react';
import { authDataContext } from './authContext';
import { userDataContext } from './UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const shopDataContext = createContext();

export function ShopProvider({ children }) {  
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);

  const currency = '₹';
  const delivery_fee = 40;

  const getProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    const cartData = structuredClone(cartItem);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItem(cartData);

    if (userData) {
      try {
        setLoading(true);
        await axios.post(
          `${serverUrl}/api/cart/add`,
          { itemId, size },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/cart/get`,
        {},
        { withCredentials: true }
      );
      setCartItem(result.data || {});
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          `${serverUrl}/api/cart/update`,
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalCount += cartItem[items][item];
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItem) {
      const itemInfo = products.find(p => p._id === productId);
      if (!itemInfo) continue;

      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (userData) {
      getUserCart();
    }
  }, [userData]);

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}
