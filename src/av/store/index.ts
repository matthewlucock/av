import { configureStore } from '@reduxjs/toolkit'
import { useSelector as baseUseSelector, TypedUseSelectorHook } from 'react-redux'

import { generalSlice } from './slices/general'
import { settingsSlice } from './slices/settings'
import { mediaSlice } from './slices/media'
import { browserDialogSlice } from './slices/browser-dialog'

export const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    settings: settingsSlice.reducer,
    media: mediaSlice.reducer,
    browserDialog: browserDialogSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector
