import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

/**
 * State
 */

type DialogDetails = Readonly<{
  message: string
  confirm?: boolean
}>

type SliceState = DialogDetails & Readonly<{
  show: boolean
  result: boolean | null
}>

const initialState: SliceState = {
  show: false,
  message: '',
  confirm: false,
  result: null
}

/**
 * Slice
 */

export const browserDialogSlice = createSlice({
  name: 'browserDialog',
  initialState,

  reducers: {
    setDialog: (state, { payload }: PayloadAction<DialogDetails>) => {
      state.show = true
      state.message = payload.message
      state.confirm = payload.confirm
      state.result = null
    },

    setShow: (state, { payload }: PayloadAction<boolean>) => {
      state.show = payload
    },

    storeResult: (state, { payload }: PayloadAction<boolean>) => {
      state.result = payload
    }
  }
})
