import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * State
 */

interface DialogDetails {
  readonly message: string
  readonly confirm?: boolean
}

interface SliceState extends DialogDetails {
  readonly show: boolean
  readonly result: boolean | undefined
}

const initialState: SliceState = {
  show: false,
  message: '',
  confirm: false,
  result: undefined
}

interface SliceRootState {
  readonly browserDialog: SliceState
}

/**
 * Slice
 */

export const browserDialogSlice = createSlice({
  name: 'browserDialog',
  initialState,

  reducers: {
    setDialog (state, action: PayloadAction<DialogDetails>) {
      state.show = true
      state.message = action.payload.message
      state.confirm = action.payload.confirm
      state.result = undefined
    },

    setShow (state, action: PayloadAction<boolean>) {
      state.show = action.payload
    },

    setResult (state, action: PayloadAction<boolean>) {
      state.show = false
      state.result = action.payload
    }
  }
})
