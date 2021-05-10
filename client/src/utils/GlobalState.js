// createContext will be used to instantiate a new Context object
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// createContext creates a new Context object
const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

//custom React Hook
const useStoreContext = () => {
    return useContext(StoreContext);
};


export { StoreProvider, useStoreContext };