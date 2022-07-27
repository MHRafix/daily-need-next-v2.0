// import { addAllProducts } from "./action";

import { addProducts } from "./action";

const initialState = {
  all_products: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case addProducts.ADD_PRODUCTS: {
      const products = payload;
      return { ...state, all_products: products };
    }
    default:
      return state;
  }
}
