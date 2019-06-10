const CART_KEY = 'cart';

export const calculateTotalPrice = items => {
  return `$${items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)}`;
}

/* Cart */
export const setCart = (items, cartKey = CART_KEY) => {
  if (localStorage)
    localStorage.setItem(cartKey, JSON.stringify(items));
}
export const getCart = () => {
  if (localStorage && localStorage.getItem(CART_KEY))
    return JSON.parse(localStorage.getItem(CART_KEY));
  return [];
}