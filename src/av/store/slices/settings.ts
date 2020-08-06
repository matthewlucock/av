import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MINIMUM_SKIP_TIME, MAXIMUM_SKIP_TIME } from 'av/globals'
import { boundValue } from 'av/util/bound-value'

/**
 * State
 */

interface SliceState {
  readonly show: boolean
  readonly skipBackTime: number
  readonly skipForwardTime: number
  readonly scaleVideo: boolean
}

const initialState: SliceState = {
  show: false,
  skipBackTime: -30,
  skipForwardTime: 30,
  scaleVideo: true
}

interface SliceRootState {
  readonly settings: SliceState
}

/**
 * Slice
 */

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    setShow (state, action: PayloadAction<boolean>) {
      state.show = action.payload
    },

    setSkipBackTime (state, action: PayloadAction<number>) {
      state.skipBackTime = boundValue(-MAXIMUM_SKIP_TIME, action.payload, -MINIMUM_SKIP_TIME)
    },

    setSkipForwardTime (state, action: PayloadAction<number>) {
      state.skipForwardTime = boundValue(MINIMUM_SKIP_TIME, action.payload, MAXIMUM_SKIP_TIME)
    },

    setScaleVideo (state, action: PayloadAction<boolean>) {
      state.scaleVideo = action.payload
    }
  }
})
