const defaultState = {
  transfers: {
    filterAll: true,
    filterNonStop: true,
    filterOneChange: true,
    filterTwoChanges: true,
    filterThreeChanges: true,
  },
}

export const filterReducer = (state = defaultState, actions = '') => {
  let checked
  switch (actions.type) {
    case 'FILTER_ALL':
      return {
        ...state,
        transfers: {
          filterAll: !state.transfers.filterAll,
          filterNonStop: !state.transfers.filterAll,
          filterOneChange: !state.transfers.filterAll,
          filterTwoChanges: !state.transfers.filterAll,
          filterThreeChanges: !state.transfers.filterAll,
        },
      }
    case 'FILTER_NON-STOP':
      checked =
        !state.transfers.filterNonStop &&
        state.transfers.filterOneChange &&
        state.transfers.filterTwoChanges &&
        state.transfers.filterThreeChanges
      return {
        ...state,
        transfers: {
          ...state.transfers,
          filterAll: state.transfers.filterNonStop ? false : state.transfers.filterAll || checked,
          filterNonStop: !state.transfers.filterNonStop,
        },
      }
    case 'FILTER_ONE_CHANGE':
      checked =
        state.transfers.filterNonStop &&
        !state.transfers.filterOneChange &&
        state.transfers.filterTwoChanges &&
        state.transfers.filterThreeChanges
      return {
        ...state,
        transfers: {
          ...state.transfers,
          filterAll: state.transfers.filterOneChange ? false : state.transfers.filterAll || checked,
          filterOneChange: !state.transfers.filterOneChange,
        },
      }
    case 'FILTER_TWO_CHANGES':
      checked =
        state.transfers.filterNonStop &&
        state.transfers.filterOneChange &&
        !state.transfers.filterTwoChanges &&
        state.transfers.filterThreeChanges
      return {
        ...state,
        transfers: {
          ...state.transfers,
          filterAll: state.transfers.filterTwoChanges
            ? false
            : state.transfers.filterAll || checked,
          filterTwoChanges: !state.transfers.filterTwoChanges,
        },
      }
    case 'FILTER_THREE_CHANGES':
      checked =
        state.transfers.filterNonStop &&
        state.transfers.filterOneChange &&
        state.transfers.filterTwoChanges &&
        !state.transfers.filterThreeChanges
      return {
        ...state,
        transfers: {
          ...state.transfers,
          filterAll: state.transfers.filterThreeChanges
            ? false
            : state.transfers.filterAll || checked,
          filterThreeChanges: !state.transfers.filterThreeChanges,
        },
      }
    default:
      return state
  }
}
