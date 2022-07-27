export const addProducts = {
  ADD_PRODUCTS: "ADD_PRODUCTS",
};

export const addAllProducts = (products) => {
  return { type: addProducts.ADD_PRODUCTS, payload: products };
};
