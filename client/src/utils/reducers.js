import { useReducer } from 'react'; 


import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';
  export const reducer = (state, action) => {
      switch(action.type) {
              // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
              case UPDATE_PRODUCTS:
              return {
                  ...state,
                  products: [...action.products],
              };
              //  if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
              case UPDATE_CATEGORIES:
                  return {
                      ...state,
                      categories: [...action.categories]
                  };

                  case UPDATE_CURRENT_CATEGORY:
                      return {
                          ...state,
                          currentCategory: action.currentCategory
                      };
                    case ADD_TO_CART:
                        return {
                            ...state,
                            cartOpen: true,
                            cart: [...state.cart, action.product]
                        };

                    case ADD_MULTIPLE_TO_CART:
                        return {
                            ...state,
                            cart: [...state.cart, ...action.products],
                        };

    // if it's none of these actions, do not update state at all and keep things the same! 
    default:
        return state;
   }
  };
// will be used to help initialize our global state object and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function. 
  export function useProductReducer(initialState) {
      return useReducer(reducer, initialState);
  }