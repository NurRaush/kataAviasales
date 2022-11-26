const defaultState = { sortName: '' }

export const sortReducer = (state = defaultState, action = '') => {
  switch (action.type) {
    case 'SORT_CHEAPEST':
      return { ...state, sortName: 'cheapest' }
    case 'SORT_FASTEST':
      return { ...state, sortName: 'fastest' }
    case 'SORT_OPTIMAL':
      return { ...state, sortName: 'optimal' }
    default:
      return state
  }
}
