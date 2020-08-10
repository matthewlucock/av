import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import Color from 'color'

import { BACKGROUND_COLOR_SATURATION, BACKGROUND_COLOR_LIGHTNESS } from 'av/globals'

/**
 * State
 */

type SliceState = Readonly<{
  appSize: Readonly<{ width: number, height: number }>
  backgroundHue: number
}>

const initialState: SliceState = {
  appSize: { width: 0, height: 0 },
  backgroundHue: 0
}

type SliceRootState = Readonly<{ general: SliceState }>

/**
 * Slice
 */

export const generalSlice = createSlice({
  name: 'general',
  initialState,

  reducers: {
    setAppSize: (state, { payload }: PayloadAction<SliceState['appSize']>) => {
      state.appSize = payload
    },

    setBackgroundHue: (state, { payload }: PayloadAction<number>) => {
      state.backgroundHue = payload % 360
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
