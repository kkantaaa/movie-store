import { createContext, useContext, useState } from "react";

const cartContext = createContext();


const ContextProvider = ({ children }) => {
  const [cart,setCart ] = useState([]);

  return (
    <cartContext.Provider value={{ cart, setCart}}>
      {children}
    </cartContext.Provider>
  );
};

const useGlobalContext = () => useContext(cartContext);


export { ContextProvider, useGlobalContext };