import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import Color from 'color'

import { BACKGROUND_COLOR_SATURATION, BACKGROUND_COLOR_LIGHTNESS } from 'av/globals'

/**
 * State
 */

interface SliceState {
  readonly appWidth: number
  readonly appHeight: number
  readonly backgroundHue: number
}

const initialState: SliceState = {
  appWidth: 0,
  appHeight: 0,
  backgroundHue: 0
}

interface SliceRootState {
  readonly general: SliceState
}

/**
 * Slice
 */

export const generalSlice = createSlice({
  name: 'general',
  initialState,

  reducers: {
    setAppSize (state, action: PayloadAction<{ readonly width: number, readonly height: number }>) {
      state.appWidth = action.payload.width
      state.appHeight = action.payload.height
    },

    setBackgroundHue (state, action: PayloadAction<number>) {
      state.backgroundHue = action.payload % 360
    }
  }
})

/**
 * Selectors
 */

export const getBackgroundColor = createSelector<SliceRootState, number, string>(
  ({ general }) => general.backgroundHue,
  hue => Color({ h: hue, s: BACKGROUND_COLOR_SATURATION, l: BACKGROUND_COLOR_LIGHTNESS }).string()
)
