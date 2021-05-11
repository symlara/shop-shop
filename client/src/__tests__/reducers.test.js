import { reducer } from '../utils/reducers';

//import our actions
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
  } from '../utils/actions';


//create a sample of what our global state will look like
const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    //which refers to the index of the categories array.
    currentCategory: '1',
    cart: [
        {
            _id: '1',
            name: 'Soup',
            purchaseQuantity: 1
        },
        {
            _id: '2',
            name: 'Bread',
            purchaseQuantity: 2
        }
    ],
    cartOpen: false
};

// With this test, we look to create a new state object.
test('UPDATE_PRODUCTS', () => {
    // this object will be the result of what comes from a function that we haven't created yet
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

// used to test how we can update the categories array.
test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

// we are updating the state of currentCategory to a new string value instead of an array. 
test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});

// so the test should verify that the initialState was not affected by the update. 
test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_CART,
        product: { purchaseQuantity: 1 }
    });

    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_MULTIPLE_TO_CART,
        products: [{}, {}]
    });

    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
});
test('REMOVE_FROM_CART', () => {
    let newState1 = reducer(initialState, {
      type: REMOVE_FROM_CART,
      _id: '1'
    });
  
    // cart is still open
    expect(newState1.cartOpen).toBe(true);
  
    // the second item should now be the first
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');
  
    let newState2 = reducer(newState1, {
      type: REMOVE_FROM_CART,
      _id: '2'
    });
  
    // cart is empty and closed
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);
  
    expect(initialState.cart.length).toBe(2);
  });

  //In this test, we want to ensure that only the first item's quantity is updated
  test('UPDATE_CART_QUANTITY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CART_QUANTITY,
        _id: '1',
        purchaseQuantity: 3
      });
    
      expect(newState.cartOpen).toBe(true);
      expect(newState.cart[0].purchaseQuantity).toBe(3);
      expect(newState.cart[1].purchaseQuantity).toBe(2);
    
      expect(initialState.cartOpen).toBe(false);
  });

  // This test simply expects the cart to be empty (and closed) after the CLEAR_CART action is called.
  test('CLEAR_CART', () => {
    let newState = reducer(initialState, {
        type: CLEAR_CART
      });
    
      expect(newState.cartOpen).toBe(false);
      expect(newState.cart.length).toBe(0);
      expect(initialState.cart.length).toBe(2);
  });

  // handle the cart's visibility toggle
  //This test expects cartOpen to be the opposite of its previous value each time the action is called. 
  test('TOGGLE_CART', () => {
    let newState = reducer(initialState, {
        type: TOGGLE_CART
      });
    
      expect(newState.cartOpen).toBe(true);
      expect(initialState.cartOpen).toBe(false);
    
      let newState2 = reducer(newState, {
        type: TOGGLE_CART
      });
    
      expect(newState2.cartOpen).toBe(false);
  });