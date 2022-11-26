export const filterAll = () => ({ type: 'FILTER_ALL' })

export const filterOneChange = () => ({ type: 'FILTER_ONE_CHANGE' })

export const filterNonStop = () => ({ type: 'FILTER_NON-STOP' })

export const filterTwoChanges = () => ({ type: 'FILTER_TWO_CHANGES' })

export const filterThreeChanges = () => ({ type: 'FILTER_THREE_CHANGES' })

export const sortCheapest = () => ({ type: 'SORT_CHEAPEST' })

export const sortOptimal = () => ({ type: 'SORT_OPTIMAL' })

export const sortFastest = () => ({ type: 'SORT_FASTEST' })

const downloadStarted = () => ({ type: 'DOWNLOAD_STARTED' })

const downloadFinished = () => ({ type: 'DOWNLOAD_FINISHED' })

const addTickets = (tickets) => ({ type: 'ADD_TICKETS', payload: tickets })

const downloadError = () => ({ type: 'DOWNLOAD_ERROR' })

export const showMoreTickets = () => ({ type: 'SHOW_MORE_TICKETS' })

async function getId() {
  let res
  try {
    res = await fetch('https://aviasales-test-api.kata.academy/search')
  } catch (e) {
    throw new Error(`Could not fetch ID, received ${res.status}`)
  }
  if (!res.ok) {
    throw new Error(`Server response is not OK, received ${res.status}`)
  }
  const result = await res.json()
  return result.searchId
}

async function fetchTickets(id, dispatch) {
  dispatch(downloadStarted())
  let res
  try {
    res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
    if (!res.ok) {
      throw new Error(`Server response is not OK, received ${res.status}`)
    }
  } catch (e) {
    dispatch(downloadFinished())
    dispatch(downloadError())
    return
  }
  const result = await res.json()
  dispatch(addTickets(result.tickets))
  if (!result.stop) {
    fetchTickets(id, dispatch)
  } else {
    dispatch(downloadFinished())
  }
}

export const getTickets = () => async (dispatch) => {
  const id = await getId()
  fetchTickets(id, dispatch)
}
