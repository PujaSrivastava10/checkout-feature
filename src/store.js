import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './pages/Listing/reducer'
import cartReducer from './pages/Cart/reducer'
import addressReducer from './pages/Address/reducer'
import appReducer from './appReducer'

export default configureStore({
  reducer: {
    listing: listingReducer,
    cart: cartReducer,
    address: addressReducer,
    app: appReducer
  }
})