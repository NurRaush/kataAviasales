import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { filterReducer } from './filter-reducer'
import { sortReducer } from './sort-reducer'
import { ticketsReducer } from './tickets-reducer'

const rootReducer = combineReducers({
  filterReducer,
  sortReducer,
  ticketsReducer,
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
