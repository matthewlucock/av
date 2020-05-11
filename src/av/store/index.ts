import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkDispatch as BaseThunkDispatch } from 'redux-thunk'

import { State } from './state'
import { Action } from './actions'
import { reducer } from './reducers'

export const store = createStore<State, Action, any, any>(reducer, applyMiddleware(thunk))

export type Dispatch = BaseThunkDispatch<State, void, Action>
