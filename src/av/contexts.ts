import { createContext } from 'react'
import mitt from 'mitt'

export const EmitterContext = createContext(mitt())
