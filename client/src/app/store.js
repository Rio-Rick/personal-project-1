import { configureStore } from '@reduxjs/toolkit'
import cuisine from '../features/cuisine/cuisine-slice'
import order from '../features/orders/order-slice'
export const store = configureStore({
  reducer: {
    cuisine,
    order
  },
})