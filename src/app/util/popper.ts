import type { VirtualElement as _VirtualElement } from '@popperjs/core'
import type { Options as PopperOffsetOptions } from '@popperjs/core/lib/modifiers/offset'

export type PopperOffset = PopperOffsetOptions['offset']
export type PopperVirtualElement = _VirtualElement
export type Coordinates = [number, number]

export const makePopperVirtualElement = ([x, y]: Coordinates): PopperVirtualElement => {
  x = Math.round(x)
  y = Math.round(y)

  return {
    getBoundingClientRect: (): DOMRect => new DOMRect(x, y, 0, 0)
  }
}
