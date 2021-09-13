import * as types from '../actions';

export const initialState = {
  mainData: [],
  cart: [],
  subtotal: 0,
};

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT_COUNT:
      incrementCartCount(state, action.id);

      return {...state};
    case types.REDUCE_COUNT:
      reduceCartCount(state, action.id);
      return {...state};
    case types.STORE_MAIN_DATA:
      state.mainData = action.payload;
      return {
        ...state,
      };
    case types.SET_SUBTOTAL:
      if (state.cart.length != 0) {
        const prodList = [];
        for (let obj of state.mainData) {
          for (let cartObj of state.cart) {
            if (cartObj.id == obj.id && cartObj.count != 0) {
               prodList.push(cartObj.count * obj.price);
              
            }
          }
        }
        let subtotalCalc =  prodList.reduce((acc, val) => {
          return (acc += val);
        }, 0);
        
        state.subtotal = subtotalCalc.toFixed(2);
      }
      return {
        ...state,
      };
    case types.DELETE_RECORD:
      deleteRecord(state, action.id);
      console.log("deleted")
      return {
        ...state,
      };
    case types.DESTROY_CART:
      state.cart = [];
      state.subtotal = 0;
      console.log('distroyed');
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default countReducer;

const incrementCartCount = (state, receivedId) => {
  const isInCart = state.cart.findIndex(obj => obj.id == receivedId);
  if (isInCart != -1) {
    let newVal = Number.parseInt(state.cart[isInCart].count) + 1;
    state.cart[isInCart].count = newVal;
    return newVal.toString();
  }
  state.cart.push({id: receivedId, count: 1});

  return 0;
};

const reduceCartCount = (state, receivedId) => {
  const isInCart = state.cart.findIndex(obj => obj.id == receivedId);
  if (isInCart != -1) {
    if (state.cart[isInCart].count != 0) {
      let newVal = Number.parseInt(state.cart[isInCart].count) - 1;

      state.cart[isInCart].count = newVal;

      state.cart[isInCart].count = newVal;
      return newVal.toString();
    }
  }
  return 0;
};

const deleteRecord = (state, id) => {
  const isInCart = state.cart.findIndex(obj => obj.id == id);
  if (isInCart != -1) {
    state.cart.splice(isInCart, 1);
    return state.cart;
  }
  return null;
};
