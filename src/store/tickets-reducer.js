const defaultState = { tickets: [], renderCount: 0, downloadError: false, isLoading: false }

export const ticketsReducer = (state = defaultState, action = '') => {
  switch (action.type) {
    case 'ADD_TICKETS':
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
        renderCount: action.payload.length > 5 ? 5 : action.payload.length,
      }
    case 'SHOW_MORE_TICKETS':
      return { ...state, renderCount: Number(state.renderCount) + 5 }
    case 'DOWNLOAD_ERROR':
      return { ...state, downloadError: true }
    case 'DOWNLOAD_STARTED':
      return { ...state, isLoading: true }
    case 'DOWNLOAD_FINISHED':
      return { ...state, isLoading: false }
    default:
      return state
  }
}
