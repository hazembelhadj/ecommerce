  
import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  console.log (res)
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};
  
  
export const filterProducts = (products, size) => { return (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products && !!products.length && products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
}};
export const sortProducts = (filteredProducts , sort) => (dispatch,getState) => {

  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};