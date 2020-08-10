import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { MINIMUM_SKIP_TIME, MAXIMUM_SKIP_TIME } from 'av/globals'
import { boundValue } from 'av/util/bound-value'

/**
 * State
 */

type SliceState = Readonly<{
  showSettings: boolean
  skipBackTime: number
  skipForwardTime: number
  scaleVideo: boolean
}>

const initialState: SliceState = {
  showSettings: false,
  skipBackTime: -30,
  skipForwardTime: 30,
  scaleVideo: true
}

/**
 * Slice
 */

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    toggleShowSettings: state => {
      state.showSettings = !state.showSettings
    },

    setSkipBackTime: (state, { payload }: PayloadAction<number>) => {
      state.skipBackTime = boundValue(-MAXIMUM_SKIP_TIME, -payload, -MINIMUM_SKIP_TIME)
    },

    setSkipForwardTime: (state, { payload }: PayloadAction<number>) => {
      state.skipForwardTime = boundValue(MINIMUM_SKIP_TIME, payload, MAXIMUM_SKIP_TIME)
    },

    setScaleVideo: (state, { payload }: PayloadAction<boolean>) => {
      state.scaleVideo = payload
    }
  }
})
